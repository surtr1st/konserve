package helpers

import "regexp"

type iValidateBuilder interface {
	Is(value any) validate
	Empty() bool
	Number() bool
}

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
