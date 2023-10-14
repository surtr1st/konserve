package controllers

import (
	"fmt"
	"konserve/api/internal/helpers"
	"konserve/api/internal/utils"
	"strings"

	"github.com/kataras/iris/v12"
)

type AuthController struct{}

func (ctrl AuthController) Authenticate(ctx iris.Context) {
	t := utils.Ternary[string]{}
	v := helpers.Validate{}

	authHeader := fmt.Sprintf("%s %s", ctx.Request().Header.Get("Authorization"), " ")
	tokenString := strings.Split(authHeader, " ")[1]
	token := t.AssignAfterCondition(v.IsEmpty(authHeader), "", tokenString)

	if v.IsEmpty(token) {
		userId, _ := ctx.Values().GetInt32("userId")
		accessToken := ctx.Values().GetString("accessToken")
		ctx.JSON(iris.Map{"userId": userId, "accessToken": accessToken})
		return
	}
}
