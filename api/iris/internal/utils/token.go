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

func (retriever tokenRetriever) BearerToken() string {
	ternary := UseTernary[string]()
	validate := UseValidate()

	authHeader := fmt.Sprintf("%s %s", retriever.ctx.Request().Header.Get("Authorization"), " ")
	tokenString := strings.Split(authHeader, " ")[1]
	nilToken := validate.Is(authHeader).Empty()

	return ternary.When(nilToken).Assign("").Else(tokenString)
}

func (retriever tokenRetriever) AccessToken() string {
	ctx := retriever.ctx
	ternary := UseTernary[string]()
	validate := UseValidate()

	accessToken := ctx.GetCookie("accessToken")
	nilToken := validate.Is(accessToken).Empty()

	return ternary.When(nilToken).Assign("").Else(accessToken)
}
