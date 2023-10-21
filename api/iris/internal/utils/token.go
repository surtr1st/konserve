package utils

import (
	"fmt"
	"strings"

	"github.com/kataras/iris/v12"
)

type tokenRetriever struct {
	ctx iris.Context
}

func UseTokenRetriever(ctx iris.Context) tokenRetriever {
	return tokenRetriever{ctx}
}

// Retrieve `Authorization` from request headers
// Split and take `bearer token`
// Return the string whether it was `bearer token` or an empty string
func (retriever tokenRetriever) BearerToken() string {
	ternary := UseTernary[string]()
	validate := UseValidate()

	authHeader := fmt.Sprintf("%s %s", retriever.ctx.Request().Header.Get("Authorization"), " ")
	tokenString := strings.Split(authHeader, " ")[1]
	nilToken := validate.Is(authHeader).Empty()

	return ternary.When(nilToken).Assign("").Else(tokenString)
}

// Retrieving the `bearer token` from Cookie
// Return the string whether it was `bearer token` or an empty string
func (retriever tokenRetriever) AccessToken() string {
	ctx := retriever.ctx
	ternary := UseTernary[string]()
	validate := UseValidate()

	accessToken := ctx.GetCookie("accessToken")
	nilToken := validate.Is(accessToken).Empty()

	return ternary.When(nilToken).Assign("").Else(accessToken)
}
