package utils

type Ternary struct{}

func (t Ternary) AssignAfterCondition(ok bool, truthyValue string, falsyValue string) string {
	if !ok {
		return falsyValue
	}
	return truthyValue
}
