package helpers

type Validate struct{}

func (v Validate) IsEmpty(value string) bool {
	return value == ""
}
