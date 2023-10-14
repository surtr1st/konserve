package middlewares

import (
	"errors"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"

	"github.com/kataras/iris/v12"
)

type UserMiddleware struct{}

// Response error messages
const (
	EMAIL    = "Email is empty! Please provide it!"
	USERNAME = "Username is empty! Please provide it!"
	PASSWORD = "Password is empty!"
)

func (middleware UserMiddleware) ValidateBody(ctx iris.Context) {
	var body models.User
	readErr := ctx.ReadJSON(&body)
	if readErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, readErr)
		return
	}

	store := "user"
	response := map[string]string{"email": EMAIL, "username": USERNAME, "password": PASSWORD}
	excludeProps := map[string]string{"uid": "uid", "displayName": "displayName", "secretCode": "secretCode"}

	ctx.Values().Set(store, body)
	handler := helpers.ErrorHandler[models.User]{Store: store, Response: response, Excludes: excludeProps}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	ctx.Next()
}

func (middleware UserMiddleware) ValidateParams(ctx iris.Context) {
	requiredParams := "id"
	handler := helpers.ErrorHandler[any]{Params: requiredParams}

	kind, message := handler.IsIntParams(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusConflict, errors.New(message))
		return
	}

	value, _ := ctx.Params().GetInt32(requiredParams)
	ctx.Values().Set("userId", value)

	ctx.Next()
}
