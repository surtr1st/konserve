package controllers

import (
	"konserve/api/internal/utils"
	"time"

	"github.com/kataras/iris/v12"
)

type AuthController struct{}

func (controller AuthController) Authenticate(ctx iris.Context) {
	validate := utils.UseValidate()
	authHeader := utils.UseTokenRetriever(ctx)

	token := authHeader.AccessToken()

	if validate.Is(token).Empty() {
		userId, _ := ctx.Values().GetInt32("userId")
		ctx.AddCookieOptions(iris.CookieHTTPOnly(true), iris.CookieExpires(time.Minute))
		ctx.SetCookieKV("accessToken", ctx.Values().GetString("accessToken"))
		ctx.Writef("%d", userId)
		return
	}
}
