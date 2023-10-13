package utils

type Ternary[T any] struct{}

func (t Ternary[T]) AssignAfterCondition(ok bool, truthyValue T, falsyValue T) T {
	if !ok {
		return falsyValue
	}
	return truthyValue
}
