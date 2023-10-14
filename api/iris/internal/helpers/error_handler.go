package helpers

import (
	"encoding/json"
	"fmt"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/utils"
	"reflect"

	"github.com/kataras/iris/v12"
)

type ErrorResponse map[string]string

type ErrorHandler[T any] struct {
	Store    string
	Response ErrorResponse
	Params   string
	Excludes map[string]string
}

func (handler ErrorHandler[T]) ValidateBody(ctx iris.Context) (kind int32, message string) {
	t := utils.Ternary[string]{}
	user := ctx.Values().Get(handler.Store).(T)

	requestBody, err := json.Marshal(user)
	if err != nil {
		return kinds.MARSHAL_ERROR, err.Error()
	}

	var object map[string]any
	if err := json.Unmarshal(requestBody, &object); err != nil {
		return kinds.UNMARSHAL_ERROR, err.Error()
	}

	excludes := handler.Excludes

	for key := range object {
		value := reflect.ValueOf(object[key])
		isEmpty := value.String() == ""
		required := excludes[key] != key

		if isEmpty && required {
			hasMessage := handler.Response != nil
			response := handler.Response[key]
			defaultMessage := fmt.Sprintf("%s is empty!", key)

			return kinds.EMPTY_FIELD, t.AssignAfterCondition(hasMessage, response, defaultMessage)
		}
	}

	return kinds.EMPTY, ""
}

func (handler ErrorHandler[T]) IsIntParams(ctx iris.Context) (kind int32, message string) {
	v := Validate{}
	params := handler.Params
	param := ctx.Params().Get(params)

	if !v.IsNumber(param) {
		return kinds.NON_DIGITS, "Params should be a number value!"
	}
	return kinds.EMPTY, ""
}
