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

func (v *validate) Is(value string) *validate {
	v.target = value
	return v
}

func (v validate) Empty() bool {
	return v.target == ""
}

func (v validate) Number() bool {
	match, _ := regexp.MatchString("^[0-9]*$", v.target)
	return match
}

func (v validate) Email() bool {
	match, _ := regexp.MatchString(`^[\w\.-]+@[\w\.-]+\.\w+`, v.target)
	return match
}

// Used for checking number only
func (v validate) Undefined() bool {
	target, _ := strconv.Atoi(v.target)
	return target == 0
}
