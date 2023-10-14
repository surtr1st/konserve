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
	token := t.AssignAfterCondition(v.IsEmpty(authHeader), "", strings.Split(authHeader, " ")[1])

	if v.IsEmpty(token) {
		userId := ctx.Values().Get("userId").(int32)
		accessToken := ctx.Values().Get("accessToken").(string)
		ctx.JSON(iris.Map{"accessToken": accessToken, "userId": userId})
		return
	}
}
