package tokenize

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

type tokenClaims struct {
  claims string `json:"claims"`
}

func GenerateToken(signer *jwt.Signer) iris.Handler {
  return func(ctx iris.Context) {
    claims := tokenClaims { claims: "@oddly_claims@" }

    token, err := signer.Sign(claims)
    if err != nil {
      ctx.StopWithStatus(iris.StatusInternalServerError)
      return
    }

    ctx.Write(token)
  }
}
