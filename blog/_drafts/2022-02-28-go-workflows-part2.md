---
layout: post
categories: blog
title: 'go-workflows: Durable Workflows in Go Part 2'
# date: 2022-02-13T21:19:06.690Z
---

_This is part 2 of the series, part 1 is [here](../_posts/2022-02-13-go-workflows-part1.md)._

Continuing from the last post, I wanted to go into a bit more detail about the internals, and how workflows are executed in [go-workflows](https://www.github.com/cschleiden/go-workflows). I have re-implemented this independently, but the core concepts are the same as used in Temporal and Cadence.

## Recap: indirect activity execution

As a reminder, [part 1](../_posts/2022-02-13-go-workflows-part1.md) explained how event sourcing is used to indirectly execute workflow code with this example. I've updated the code to use [Go generics](https://cschleiden.dev/blog/2022-03-06-go-workflows-generics/), and made it a bit more verbose to show the return types of `ExecuteActivity`:

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

In practice there is some more control required: we need to know if a workflow is currently blocked, if it's already finished, if it's deadlocked, if it has hit any panics, etc. To manage that, go-workflows uses a "Coroutine" implementation. The main functionality of the implementation for go-workflows is this interface:

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

There is more to the real implementation, but the core aspects are starting or continuing the execution (`Execute`), `Yield`ing when waiting for a result, and checking whether the coroutine is blocked (`Blocked`).

The concrete implementation of the `Coroutine` interface is made available via the context to the executed workflow. Simplified, the workflow engine executes a workflow like this:

```go
func NewCoroutine(ctx Context, fn func(ctx Context) error) Coroutine {
	s := newState()
	ctx = withCoState(ctx, s)

	go func() {
		defer s.finish() // Ensure we always mark the coroutine as finished

		// yield before the first execution
		s.yield(false)

		// Execute passed
		s.err = fn(ctx)
	}()

	return s
}
```

1. New coroutine state is created and added as a value to the context.
1. Goroutine is spawned
		1. Ensure that eventually the coroutine is marked as finished
		1. `Yield` is called before the first execution
		1. The passed in `fn` -- in this case the workflow -- is executed, and any error is captured
1. Coroutine state is returned

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


## Workflow state: tracking the `Future`(s)

Now that we have seen how workflow execution can block and wait for a result, let's see how we can unblock it.

In addition to the coroutine state, the `workflow.Context` is also used to pass around a `workflowState`. While the coroutine implementation is generic and not tied to any specific workflow features, the `workflowState` *is* specific to the workflow execution. Among other things it keeps track of `Futures` the workflow is currently waiting for:

```go
type workflowState struct {
	scheduleEventID int64
	pendingFutures  map[int64]SettableFuture
}
```

For exeucting an activity (or a subworkflow or ...) we perform these steps:

```golang
func ExecuteActivity[T any](ctx workflow.Context, activity interface{}) Future[T] {
	f := NewFuture[T]

	wfState := getWorkflowState(ctx)

	eventID := wfState.GetNextScheduleEventID()
	wfState.TrackFuture(eventID, f)

	// ... generate the ActivityScheduledEvent with eventID

	return f
}
```

1. Create a new `Future`
1. Get the state for the currently executing workflow from the `workflow.Context`
1. Get the next _schedule event ID_ from the workflow state, this is a monotonically increasing ID used for correlating events
1. Track the future in the workflow state
1. Return it to the caller (i.e., the workflow)

`TrackFuture` adds the future to the `workflowState`'s `pendingFutures` map under the given event ID. This allows us to provide a value once we receive an `ActivityCompleted` or `ActivityFailed` event.

`SettableFuture[T]` is just a simple extension of `Future[T]` and allows the caller to provide a value:

```go
type SettableFuture[T any] interface {
	Future[T]

	Set(v T, err error) error
}
```

All it does is store the value an error.

## Creating events: command

So far we've skipped over how events are created. The answer are `commands`.

```go
type WorkflowState struct {
	scheduleEventID int64
	pendingFutures  map[int64]DecodingSettable
	commands        []*command.Command
}
```

## Putting it all together:

Executor: