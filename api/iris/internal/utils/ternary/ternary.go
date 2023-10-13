package ternary

type Ternary struct {}

func (t Ternary) AssignAfterCompare(ok bool, truthyValue string, falsyValue string) string {
  if !ok {
    return falsyValue
  }
  return truthyValue
}

