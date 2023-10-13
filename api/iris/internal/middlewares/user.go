package middlewares

import (
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"strconv"

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
	code, message := handler.ValidateBody(ctx)

	if code != 0 {
		ctx.StopWithJSON(iris.StatusNotFound, iris.Map{"message": message})
		return
	}

	ctx.Next()
}

func (middleware UserMiddleware) ValidateParams(ctx iris.Context) {
	requiredParams := "id"
	handler := helpers.ErrorHandler[any]{Params: requiredParams}
	code, message := handler.IsIntParams(ctx)
	if code != 0 {
		ctx.StopWithJSON(iris.StatusConflict, iris.Map{"message": message})
		return
	}
	param, _ := strconv.Atoi(ctx.Params().Get(requiredParams))
	ctx.Values().Set("userId", int32(param))
	ctx.Next()
}
