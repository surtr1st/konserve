package controllers

import (
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type AuthController struct{}

func (controller AuthController) Authenticate(ctx iris.Context) {
	validate := utils.UseValidate()
	authHeader := utils.UseHeaderRetriever(ctx)

	token := authHeader.BearerToken()
	if validate.Is(token).Empty() {
		userId, _ := ctx.Values().GetInt32("userId")
		accessToken := ctx.Values().GetString("accessToken")

		ctx.JSON(iris.Map{"userId": userId, "accessToken": accessToken})
		return
	}
}
