---
layout: post
categories: blog
title: 'go-workflows: Durable Workflows in Go Part 2'
# date: 2022-05-02T20:19:06.690Z
---

Continuing from the last [post](/blog/2022-02-13-go-workflows-part1), I wanted to go into a bit more detail about the internals, and how workflows are executed in [go-workflows](https://www.github.com/cschleiden/go-workflows). I have re-implemented this independently, but the core concepts are the same as used in Temporal and Cadence.

* this unordered seed list will be replaced by the toc
{:toc .large-only}

## Recap: indirect activity execution

As a reminder, [part 1](/blog/2022-02-13-go-workflows-part1) explained how event sourcing is used to indirectly execute workflow code with this example. I've updated the code to use [Go generics](https://cschleiden.dev/blog/2022-03-06-go-workflows-generics/), and made it a bit more verbose to show the return types of `ExecuteActivity`:

```go
func OrderWorkflow(ctx workflow.Context, item string) error {
	var processFuture Future[any]
	process = workflow.ExecuteActivity(ctx, Process, item)
	_, err := process.Get[any](ctx)

	var sendConfirmation Future[any]
	sendConfirmation = workflow.ExecuteActivity(ctx, SendConfirmation, item)
	_, err := sendConfirmation.Get[any](ctx)

	return nil
}

func Process(ctx context.Context, item string) error {
	// ...
	fmt.Println(item)

	return nil
}

func SendConfirmation(ctx context.Context, item string) error {
	// ...
	fmt.Println("Confirmation for:", item)

	return nil
}
```

So when this workflow is executed, we don't call `Process` or `SendConfirmation` directly, but instead we pass them to `workflow.ExecuteActivity`. `ExecuteActivity` returns a `Future[T]`, similar to a `Task<T>` in C# or `Promise<T>` in Type/JavaScript. It represents the future result of an async call, in this case the execution of the activities `Process` and `SendConfirmation`.

The `Future` interface itself is very simple:

```go
type Future[T any] interface {
	Get(ctx workflow.Context) (T, error)
}
```

Its only method is `Get`, which takes a `workflow.Context`, blocks until the result is available, and returns the result or an `error`.

In our workflow, we instruct the workflow engine to execute an activity, and then block until the result is available by calling `Get` on the returned `Future`. At this point we need to pause the workflow execution, and resume once the activity result is available. This is the same whether we are executing the workflow for the first time, or we are replaying existing events. How do we do that?

## Workflow execution: coroutines

go-workflows (as well as Temporal/Cadence) use a form of cooperative multitasking for executing workflows. To execute workflows, we make use of Go's concurrency features. High-level, we execute the workflow in a goroutine and communicate with the running workflow via channels. When the workflow is waiting for a result, it does a blocking receive `<-` on a channel, and when the result is available, the workflow engine sends a signal on that channel to unblock the workflow and let the execution continue.

In practice there is some more control required: we need to know if a workflow is currently blocked, if it's already finished, if it's deadlocked, if it has hit any panics, etc. To manage that, go-workflows has a "coroutine" implementation. The important functionality are these three methods:

```go
type Coroutine interface {
	// Execute continues execution of a blocked corouting and waits until
	// it is finished or blocked again
	Execute()

	// Yield yields execution and stops coroutine execution
	Yield()

	// Blocked indicates if the Corotine is blocked
	Blocked() bool
}
```

There is more to the real implementation, but the core aspects are starting or continuing the execution (`Execute`), blocking and yielding ing when waiting for a result (`Yield`), and checking whether the coroutine is currently blocked (`Blocked`).

The concrete implementation of the `Coroutine` interface is made available via the context to the executed workflow. Simplified, the workflow engine executes a workflow like this:

```go
func NewCoroutine(ctx Context, fn func(ctx Context) error) Coroutine {
	s := newState()
	ctx = withCoState(ctx, s)

	go func() {
		// yield before the first execution
		s.yield()

		// Execute passed
		s.err = fn(ctx)
	}()

	return s
}
```

1. Create new coroutine state, add as a value to the context.
1. Spawn new goroutine
	1. Call `Yield` before the first execution
	1. Execute the passed in `fn` which in this case is the workflow: pass in the context with the coroutine state
1. Return coroutine

## Yielding when waiting for a result

The key for interacting with `Future` and other synchronization primitives is that the coroutine state is added to the context. From the earlier example we saw that the blocking `Get` takes a `workflow.Context` as a parameter, and this coroutine state is the main reason.

The `Future[T]` implementation of `Get` roughly looks like this:


```go
func (f *future[T]) Get(ctx workflow.Context) (T, error) {
	for {
		if f.hasValue {
			return f.v, nil
		}

		cr := getCoState(ctx)
		cr.Yield()
	}
}
```

We check if the future has a value set. If there is one, return the value (error handling omitted here). If there is no value, get the executing coroutine from the passed in `workflow.Context`. Then `Yield` the current execution, which blocks until the coroutine is woken up again, for example, because a new value is available for a `Future`.


## Workflow state: tracking the `Future`

Now that we have seen how workflow execution can block and wait for a result, let's see how we can unblock it.

In addition to the coroutine state, the `workflow.Context` is also used to pass around a `workflowState`. While the coroutine implementation is generic and not tied to any specific workflow features, the `workflowState` *is* specific to the workflow execution. Among other things it keeps track of `Futures` representing future results in the current workflow:

```go
type workflowState struct {
	scheduleEventID int64
	pendingFutures  map[int64]SettableFuture
}
```

For executing an activity (or a subworkflow or ...) we perform these steps:

```golang
func ExecuteActivity[T any](ctx workflow.Context, activity interface{}) Future[T] {
	// 1. Create a new future
	f := NewFuture[T]

	// 2. Get the current workflow state from the workflow.Context
	wfState := getWorkflowState(ctx)

	// 3. Get the next _schedule event ID_ from the workflow state, this is a monotonically increasing ID used for correlating events
	eventID := wfState.GetNextScheduleEventID()

	// 4. Track the future in the workflow state
	wfState.TrackFuture(eventID, f)

	// ... generate the ActivityScheduledEvent with eventID

 	// 5. Return future to caller
	return f
}
```

`TrackFuture` adds the future to the `workflowState`'s `pendingFutures` map under the given event ID. This allows us to provide a value once we receive an `ActivityCompleted` or `ActivityFailed` event.

`SettableFuture[T]` is just a simple extension of `Future[T]` and allows the caller to provide a value, all it does is to store the value and an optional error:

```go
type SettableFuture[T any] interface {
	Future[T]

	Set(v T, err error) error
}
```

So whenever the workflows is in a blocked state, and we are executing an event from the history that contains a result, we can look up its corresponding `Future` in the workflow state via its `ScheduleEventID` and then set the value. Then continue the execution of the workflow-coroutine and the blocked `Future.Get` call now returns the value and the workflow can continue.

## Creating events: `Command`s

So far we've skipped over how events are created. The answer are `Commands`, which are also tracked in the workflow state:

```go
type WorkflowState struct {
	scheduleEventID int64
	pendingFutures  map[int64]DecodingSettable
	commands        []*command.Command
}
```

Commands are actions to be performed by the workflow executor after the current workflow execution is finished. In the current example, `ExecuteActivity` creates and tracks the `Future` as shown above, but it also adds a pending `ScheduleActivityTaskCommand` to the workflow state:

```golang
func ExecuteActivity[T any](ctx workflow.Context, activity interface{}) Future[T] {
	// 1. Create a new future
	f := NewFuture[T]

	// 2. Get the current workflow state from the workflow.Context
	wfState := getWorkflowState(ctx)

	// 3. Get the next _schedule event ID_ from the workflow state, this is a monotonically increasing ID used for correlating events
	eventID := wfState.GetNextScheduleEventID()

	// 4. Track the future in the workflow state
	wfState.TrackFuture(eventID, f)

	// ==> 5. Add a new command for scheduling this activity
	name := fn.Name(activity)
	cmd := command.NewScheduleActivityTaskCommand(scheduleEventID, name, inputs)
	wfState.AddCommand(&cmd)

 	// 6. Return future to caller
	return f
}
```

## Example workflow execution

Simplified this happens when we execute a workflow like:

```go
func OrderWorkflow(ctx workflow.Context, item string) error {
	var processFuture Future[any]
	process = workflow.ExecuteActivity(ctx, Process, item)
	_, err := process.Get[any](ctx)

	var sendConfirmation Future[any]
	sendConfirmation = workflow.ExecuteActivity(ctx, SendConfirmation, item)
	_, err := sendConfirmation.Get[any](ctx)

	return nil
}
```

**First workflow execution**

1. Create new workflow state, add to context
1. Create new `Coroutine`, pass the workflow function as `fn`. Receive workflow state in the context
1. Start the workflow.
1. When `ExecuteActivity` is called we create a new `Future` and track it in the workflow state. We also add a new `Command` that yields a `ScheduleActivity` event.
1. The `process.Get` call blocks since at this point the future does not have a result

Now the workflow cannot make progress. There are no events to execute since this is the first execution, and the coroutine stays blocked. At this point we process all pending commands from the workflow state, and pass their events to the backend.


**Activity execution**

1. The backend takes the `ScheduleActivity` event, persists it in the workflow instance history, and schedules the activity execution for an activity worker
1. Activity worker executes the activity: runs the activity code and records the result in a `ActivityCompleted` event
1. The backend persists the `ActivityCompleted` event and schedules a workflow execution for a workflow worker

**Second workflow execution**

This time there are two events to execute:
- `ScheduleActivity` with the name and inputs of the activity
- `ActivityCompleted` with the result

1. Create new workflow state, add to context
1. Create new `Coroutine`, pass the workflow function as `fn`. Receive workflow state in the context
1. Start the workflow.
1. When `ExecuteActivity` is called we create a new `Future` and track it in the workflow state. We also add a new `Command` that yields a `ScheduleActivity` event.
1. The `process.Get` call blocks since at this point the future does not have a result
1. This time, since we have an event, we execute the first event in the history: `ScheduleActivity`. This event matches the command and future we just created, so we remove the command, since it has already been executed.
1. Try to continue the workflow execution. Since the future still has no result, the workflow stays blocked
1. Execute the next event: `ActivityCompleted`. This event has the result of the activity, so we set the future's result and continue the workflow execution.
1. The workflow is unblocked and progresses to the next `ExecuteActivity` call
1. and so on...

## Summary

I hope this helps a bit to understand how the execution of a workflow can be paused and resumed. To really grasp the concepts I've found it helpful to just clone the [repository](https://github.com/cschleiden/go-workflows) or open it in a Codespace and debug one of the samples with the in-memory backend. With this post as a reference, it shouldn't be too difficult to follow the flow.

- [Part 1 - Durable workflows and event sourcing](/blog/2022-02-13-go-workflows-part1)
- [Part 2 - Cooperative scheduler and events in-depth](/blog/2022-05-02-go-workflows-part2)
- Part 3 - Architecture & Backends