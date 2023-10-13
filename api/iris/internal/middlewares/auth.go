package middlewares

import "github.com/kataras/iris/v12"

type AuthMiddleware struct{}

func (m AuthMiddleware) VerifyToken(ctx iris.Context) {
	ctx.Next()
}

func (m AuthMiddleware) VerifyUser(ctx iris.Context) {
	ctx.Next()
}
