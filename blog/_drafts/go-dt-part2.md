In [Part 1](../_posts/2022-02-13-go-dt-part1.md) I gave a very quick very high-level overview of `go-dt`. In this part I want to go deeper into how events get captured, replayed, and how the Go implementation is made deterministic.

For example, given the following history:

#|Name|Attributes|
:-|:-|:-|
1|`WorkflowExecutionStarted`|`OrderWorkflow`|
2|`ActivityScheduled`|`Process`|
3|`ActivityCompleted`|`some-output`|
4|`ActivityScheduled`|`SendConfirmation`|
{:.smaller}
{:.stretch-table}

and the same example workflow:

```go
func OrderWorkflow(ctx workflow.Context, item string) error {
	workflow.ExecuteActivity(ctx, Process, item).Get(ctx, nil)

	workflow.ExecuteActivity(ctx, SendConfirmation, item).Get(ctx, nil)

	return nil
}

func Process(ctx context.Context, item string) error {
	// ...
	fmt.Println(item)
}

func SendConfirmation(ctx context.Context, item string) error {
	// ...
	fmt.Println("Confirmation for:", item)
}
```

## Coroutine

## Cooperative Scheduler

### `Yield`

Go has channels.

## Example

```go
var f Future

func Calculate(ctx context.Context) {
  var result int
  f.Get(ctx, result) // blocking

  result = result + 10

  fmt.Println("Result is", result)
}
```

```go
scheduler.NewCo
```