package controllers

import (
	"konserve/api/internal/constants/env"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

type AuthController struct{}

func (controller AuthController) Authenticate(ctx iris.Context) {
	validate := utils.UseValidate()
	authHeader := utils.UseTokenRetriever(ctx)

	token := authHeader.AccessToken()

	if validate.Is(token).Empty() {
		userId, _ := ctx.Values().GetInt32("userId")
		accessToken := ctx.Values().GetString("accessToken")
		ctx.JSON(iris.Map{"user": userId, "bearer": accessToken})
		return
	}
}

func (controller AuthController) VerifyAuthorization(ctx iris.Context) {
	token := ctx.URLParam("token")

	if _, err := jwt.Verify(jwt.HS256, []byte(env.SIGNATURE_KEY), []byte(token)); err != nil {
		ctx.StopWithStatus(iris.StatusUnauthorized)
		return
	}
}
