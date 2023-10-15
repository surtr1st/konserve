package utils

import (
	"encoding/json"
	"fmt"
	"konserve/api/internal/constants/kinds"
	locale "konserve/api/pkg/localization"
	"reflect"

	"github.com/kataras/iris/v12"
)

type ErrorResponse map[string]string

type Exclude map[string]string

type ErrorHandler[T any] struct {
	Store         string
	ErrorResponse ErrorResponse
	Params        string
	Excludes      Exclude
}

func (handler ErrorHandler[T]) ValidateBody(ctx iris.Context) (kind int32, message string) {
	ternary := UseTernary[string]()

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
			hasMessage := handler.ErrorResponse != nil
			response := handler.ErrorResponse[key]
			defaultMessage := fmt.Sprintf("%s is empty!", key)

			return kinds.EMPTY_FIELD, ternary.When(hasMessage).Assign(response).Else(defaultMessage)
		}
	}

	return kinds.EMPTY, ""
}

func (handler ErrorHandler[T]) IsIntParams(ctx iris.Context) (kind int32, message string) {
	validate := UseValidate()

	params := handler.Params
	param := ctx.Params().Get(params)

	if !validate.Is(param).Number() {
		return kinds.NON_DIGITS, locale.INVALID_PARAMS_TYPE
	}

	return kinds.EMPTY, ""
}
