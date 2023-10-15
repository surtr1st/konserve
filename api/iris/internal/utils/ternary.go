package utils

type ternary[T any] struct {
	value  T
	status bool
}

func UseTernary[T any]() *ternary[T] {
	return &ternary[T]{}
}

func (t *ternary[T]) When(condition bool) *ternary[T] {
	t.status = condition
	return t
}

func (t *ternary[T]) Assign(truthyValue T) *ternary[T] {
	t.value = truthyValue
	return t
}

func (t *ternary[T]) Else(falsyValue T) T {
	if !t.status {
		t.value = falsyValue
		return t.value
	}
	return t.value
}

// When(condition)
// .Assign(true)
// .Else(false)
