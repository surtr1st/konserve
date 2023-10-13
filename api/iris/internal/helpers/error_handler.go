package helpers

import (
	"encoding/json"
	"fmt"
	"konserve/api/internal/utils"
	"reflect"
	"regexp"

	"github.com/kataras/iris/v12"
)

type ErrorResponse map[string]string

type ErrorHandler[T any] struct {
	Store    string
	Response ErrorResponse
	Params   string
}

const (
	EMPTY           = 0
	EMPTY_FIELD     = 1
	MARSHAL_ERROR   = 2
	UNMARSHAL_ERROR = 3
	NON_DIGITS      = 4
)

func (handler ErrorHandler[T]) ValidateBody(ctx iris.Context) (code int32, message string) {
	t := utils.Ternary{}
	user := ctx.Values().Get(handler.Store).(T)
	requestBody, err := json.Marshal(user)
	if err != nil {
		return MARSHAL_ERROR, err.Error()
	}

	var object map[string]any
	if err := json.Unmarshal(requestBody, &object); err != nil {
		return UNMARSHAL_ERROR, err.Error()
	}

	for key := range object {
		value := reflect.ValueOf(object[key])
		isEmpty := value.String() == ""
		if isEmpty {
			var hasMessage bool = handler.Response != nil
			var response string = handler.Response[key]
			defaultMessage := fmt.Sprintf("%s is empty!", key)
			return EMPTY_FIELD, t.AssignAfterCondition(hasMessage, response, defaultMessage)
		}
	}

	return EMPTY, ""
}

func (handler ErrorHandler[T]) IsIntParams(ctx iris.Context) (code int32, message string) {
	params := handler.Params
	param := ctx.Params().Get(params)
	if !handler.isNumber(param) {
		return NON_DIGITS, "Params should be a number value!"
	}
	return EMPTY, ""
}

func (handler ErrorHandler[T]) isNumber(value string) bool {
	match, _ := regexp.MatchString("[0-9]", value)
	return match
}
