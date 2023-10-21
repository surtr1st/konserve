package utils

import (
	"regexp"
	"strconv"
)

type validate struct {
	target string
}

func UseValidate() validate {
	return validate{}
}

// Set target to validate
func (v *validate) Is(value string) *validate {
	v.target = value
	return v
}

// Validate empty string
// Return `true` if it's empty
func (v validate) Empty() bool {
	return v.target == ""
}

// Validate string value if it was a digit or number by regex
// Return `true` if it's match
func (v validate) Number() bool {
	match, _ := regexp.MatchString("^[0-9]*$", v.target)
	return match
}

// Validate email format by regex
// Return `true` if it's match
func (v validate) Email() bool {
	match, _ := regexp.MatchString(`^[\w\.-]+@[\w\.-]+\.\w+`, v.target)
	return match
}

// To check number only
// Defined as `undefined` if it's zero
// Return `true` if it's zero
func (v validate) Undefined() bool {
	target, _ := strconv.Atoi(v.target)
	return target == 0
}
