package middlewares

import (
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type AuthMiddleware struct{}

func (m AuthMiddleware) VerifyUser(ctx iris.Context) {
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
	encrypt := utils.Encrypto{}
	code, message := handler.ValidateBody(ctx)

	if code != 0 {
		ctx.StopWithJSON(iris.StatusNotFound, iris.Map{"message": message})
		return
	}

	user, findErr := service.FindByUsername(account.Username)
	if findErr != nil {
		ctx.StopWithJSON(iris.StatusInternalServerError, findErr)
		return
	}

	verifyPassword := encrypt.IsMatch([]byte(user.Password), account.Password)
	if verifyPassword != nil {
		ctx.StopWithJSON(iris.StatusForbidden, iris.Map{"message": "Password does not match!"})
		return
	}
	ctx.Values().Set("userId", user.Uid)

	ctx.Next()
}
