package utils

import "github.com/kataras/iris/v12/middleware/jwt"

// A TokenClaims represents an assertion for identify user
type TokenClaims struct {
	jwt.Claims
	Secret int32 `json:"secret"`
}
