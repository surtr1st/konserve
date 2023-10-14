package helpers

import "regexp"

type Validate struct{}

func (v Validate) IsEmpty(value string) bool {
	return value == ""
}

func (v Validate) IsNumber(value string) bool {
	match, _ := regexp.MatchString("^[0-9]*$", value)
	return match
}
