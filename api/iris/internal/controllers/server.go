package controllers

import (
	"fmt"

	"github.com/kataras/iris/v12"
)

type ServerController struct{}

func (controller ServerController) RemoveCookie(ctx iris.Context) {
	name := ctx.URLParam("name")

	fmt.Println(ctx.Request().Cookies())
	ctx.RemoveCookie(name)

	fmt.Println(ctx.Request().Cookies())
	ctx.Writef("Cookie '%s' removed", name)
}
