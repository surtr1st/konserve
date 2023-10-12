package auth

import "github.com/kataras/iris/v12"

func VerifyToken(ctx iris.Context) {
  ctx.Next()
}

func VerifyUser(ctx iris.Context) {
  ctx.Next()
}

