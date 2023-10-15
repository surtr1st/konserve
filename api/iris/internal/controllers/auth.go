package controllers

import (
	"fmt"
	"konserve/api/internal/helpers"
	"konserve/api/internal/utils"
	"strings"

	"github.com/kataras/iris/v12"
)

type AuthController struct{}

func (controller AuthController) Authenticate(ctx iris.Context) {
	ternary := utils.UseTernary[string]()
	validate := helpers.UseValidate()

	authHeader := fmt.Sprintf("%s %s", ctx.Request().Header.Get("Authorization"), " ")
	tokenString := strings.Split(authHeader, " ")[1]
	nilToken := validate.Is(authHeader).Empty()
	token := ternary.When(nilToken).Assign("").Else(tokenString)

	if validate.Is(token).Empty() {
		userId, _ := ctx.Values().GetInt32("userId")
		accessToken := ctx.Values().GetString("accessToken")

		ctx.JSON(iris.Map{"userId": userId, "accessToken": accessToken})
		return
	}
}
