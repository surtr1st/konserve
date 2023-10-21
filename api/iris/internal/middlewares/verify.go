package middlewares

import (
	"errors"
	"fmt"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"
	locale "konserve/api/pkg/localization"

	"github.com/kataras/iris/v12"
)

type VerifyMiddleware struct{}

func (middleware VerifyMiddleware) Verify(ctx iris.Context) {
	encrypt := utils.UseEncrypt()
	service := services.UserService{DB: utils.UseTurso()}

	userId, _ := ctx.URLParamInt("userId")
	secretCode := ctx.URLParam("secretCode")
	verifyCount, _ := ctx.URLParamInt("verifyCount")

	user, err := service.Find(userId)
	if err != nil {
		return
	}

	hashedSecret, _ := encrypt.Hash(secretCode)
	if isSecretMatch := encrypt.IsMatch([]byte(hashedSecret), user.SecretCode); isSecretMatch != nil {
		ctx.StopWithError(iris.StatusNotAcceptable, errors.New(fmt.Sprintf("%s Verify Count: %d", locale.MISMATCH_SECRET_CODE, verifyCount)))
		return
	}

	if verifyCount >= 3 {
		ctx.StopWithError(iris.StatusNotAcceptable, errors.New(locale.VERIFY_STATE_LOCKED))
		return
	}

	ctx.Next()
}
