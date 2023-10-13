package middlewares

import (
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"

	"github.com/kataras/iris/v12"
)

type UserMiddleware struct{}

func (middleware UserMiddleware) ValidateBody(ctx iris.Context) {
	var body models.User
	readErr := ctx.ReadJSON(&body)
	if readErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, readErr)
		return
	}

	store := "user"
	response := map[string]string{"email": "Email is empty! Please provide it!", "username": "Username is empty! Please provide it!", "password": "Password is empty!"}

	ctx.Values().Set(store, body)
	handler := helpers.ErrorHandler[models.User]{Store: store, Response: response}
	code, message := handler.ValidateBody(ctx)

	if code != 0 {
		ctx.StopWithJSON(iris.StatusNotFound, iris.Map{"message": message})
		return
	}

	ctx.Next()
}
