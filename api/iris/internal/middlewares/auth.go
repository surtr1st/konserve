package middlewares

import (
	"errors"
	"konserve/api/internal/constants/env"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"
	locale "konserve/api/pkg/localization"
	"strings"
	"time"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

type AuthMiddleware struct{}

func (middleware AuthMiddleware) VerifyUser(ctx iris.Context) {
	var account models.Account

	if err := ctx.ReadJSON(&account); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	encrypt := utils.UseEncrypt()
	service := services.UserService{DB: utils.UseTurso()}

	store := "account"
	ctx.Values().Set(store, account)
	errorResponse := map[string]string{"username": locale.MISSING_USERNAME, "password": locale.MISSING_PASSWORD}
	handler := utils.ErrorHandler[models.Account]{Store: store, ErrorResponse: errorResponse}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	user, err := service.FindByUsername(account.Username)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
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

func (middleware AuthMiddleware) GenerateToken(ctx iris.Context) {
	secret, _ := ctx.Values().GetInt32("userId")
	claims := utils.TokenClaims{Secret: secret}

	token, err := jwt.Sign(jwt.HS256, []byte(env.SIGNATURE_KEY), claims, jwt.MaxAge(time.Minute))
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.Values().Set("accessToken", string(token))
	ctx.Next()
}

func (middleware AuthMiddleware) VerifyToken(ctx iris.Context) {
	validate := utils.UseValidate()
	authHeader := utils.UseTokenRetriever(ctx)
	token := strings.TrimSpace(authHeader.AccessToken())

	incomingRequest := ctx.Request().URL.Path

	switch incomingRequest {
	case "/api/auth":
		if validate.Is(token).Empty() {
			ctx.Next()
			return
		}
	case "/api/user/register":
		ctx.Next()
		return
	}

	if _, err := jwt.Verify(jwt.HS256, []byte(env.SIGNATURE_KEY), []byte(token)); err != nil {
		ctx.StopWithError(iris.StatusUnauthorized, errors.New(locale.UNAUTHORIZED))
		return
	}

	ctx.Next()
}
