package middlewares

import (
	"errors"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"
	locale "konserve/api/pkg/localization"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

type AuthMiddleware struct{}

func (middleware AuthMiddleware) VerifyUser(ctx iris.Context) {
	var account models.Account

	if err := ctx.ReadJSON(&account); err != nil {
		ctx.StopWithJSON(iris.StatusInternalServerError, err)
		return
	}

	encrypt := utils.UseEncrypt()
	service := services.UserService{DB: utils.UseTurso()}

	store := "account"
	ctx.Values().Set(store, account)
	errorResponse := map[string]string{"username": locale.MISSING_USERNAME, "password": locale.MISSING_PASSWORD}
	handler := helpers.ErrorHandler[models.Account]{Store: store, ErrorResponse: errorResponse}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	user, findError := service.FindByUsername(account.Username)
	if findError != nil {
		ctx.StopWithJSON(iris.StatusInternalServerError, findError)
		return
	}

	matchPassword := encrypt.IsMatch([]byte(user.Password), account.Password)
	if matchPassword != nil {
		ctx.StopWithError(iris.StatusForbidden, errors.New(locale.PASSWORD_INCORRECT))
		return
	}

	ctx.Values().Set("userId", user.Uid)

	ctx.Next()
}

func (middleware AuthMiddleware) GenerateToken(signer *jwt.Signer) iris.Handler {
	return func(ctx iris.Context) {
		userId, valueError := ctx.Values().GetInt32("userId")
		if valueError != nil {
			ctx.StopWithError(iris.StatusInternalServerError, valueError)
			return
		}
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
