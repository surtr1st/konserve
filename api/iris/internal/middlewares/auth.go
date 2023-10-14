package middlewares

import (
	"errors"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

type AuthMiddleware struct{}

func (middleware AuthMiddleware) VerifyUser(ctx iris.Context) {
	var account models.Account
	err := ctx.ReadJSON(&account)
	if err != nil {
		ctx.StopWithJSON(iris.StatusInternalServerError, err)
		return
	}

	store := "account"
	response := map[string]string{"username": USERNAME, "password": PASSWORD}
	service := services.UserService{DB: utils.UseTurso()}
	ctx.Values().Set("account", account)
	handler := helpers.ErrorHandler[models.Account]{Store: store, Response: response}
	encrypt := utils.Encrypt{}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	user, findErr := service.FindByUsername(account.Username)
	if findErr != nil {
		ctx.StopWithJSON(iris.StatusInternalServerError, findErr)
		return
	}

	matchPassword := encrypt.IsMatch([]byte(user.Password), account.Password)
	if matchPassword != nil {
		ctx.StopWithError(iris.StatusForbidden, errors.New("Password does not match!"))
		return
	}

	ctx.Values().Set("userId", user.Uid)

	ctx.Next()
}

func (middleware AuthMiddleware) GenerateToken(signer *jwt.Signer) iris.Handler {
	return func(ctx iris.Context) {
		userId, _ := ctx.Values().GetInt32("userId")
		claims := utils.TokenClaims{UserId: userId}

		token, err := signer.Sign(claims)
		if err != nil {
			ctx.StopWithError(iris.StatusInternalServerError, err)
			return
		}

		ctx.Values().Set("accessToken", string(token))
		ctx.Next()
	}
}
