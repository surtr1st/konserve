package controllers

import "github.com/kataras/iris/v12"

type ServerController struct{}

func (controller ServerController) RemoveCookie(ctx iris.Context) {
	name := ctx.URLParam("name")

	ctx.RemoveCookie(name)

	ctx.Writef("Cookie '%s' removed", name)
}
