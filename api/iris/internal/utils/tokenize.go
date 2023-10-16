package utils

import "github.com/kataras/iris/v12/middleware/jwt"

type TokenClaims struct {
	jwt.Claims
	Secret int32 `json:"secret"`
}
