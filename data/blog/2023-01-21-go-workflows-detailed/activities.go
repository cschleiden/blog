func Process(ctx context.Context, item string) error {
	// ...
	fmt.Println(item)
}

func SendConfirmation(ctx context.Context, item string) error {
	// ...
	fmt.Println("Confirmation for:", item)
}