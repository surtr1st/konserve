package utils

import (
	"fmt"
	"strings"

	"github.com/kataras/iris/v12"
)

type headerRetriever struct {
	ctx iris.Context
}

func UseHeaderRetriever(ctx iris.Context) headerRetriever {
	return headerRetriever{ctx}
}

func (retriever headerRetriever) BearerToken() string {
	ternary := UseTernary[string]()
	validate := UseValidate()

	authHeader := fmt.Sprintf("%s %s", retriever.ctx.Request().Header.Get("Authorization"), " ")
	tokenString := strings.Split(authHeader, " ")[1]
	nilToken := validate.Is(authHeader).Empty()

	return ternary.When(nilToken).Assign("").Else(tokenString)
}
