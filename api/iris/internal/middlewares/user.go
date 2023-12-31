package middlewares

import (
	"errors"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"
	locale "konserve/api/pkg/localization"
	"strconv"

	"github.com/kataras/iris/v12"
)

type UserMiddleware struct{}

func (middleware UserMiddleware) VerifyBody(ctx iris.Context) {
	var body models.User

	if err := ctx.ReadJSON(&body); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	store := "user"
	errorResponse := map[string]string{"email": locale.MISSING_EMAIL, "username": locale.MISSING_USERNAME, "password": locale.MISSING_PASSWORD}
	excludeProps := map[string]string{"uid": "uid", "displayName": "displayName", "secretCode": "secretCode"}

	ctx.Values().Set(store, body)
	handler := utils.ErrorHandler[models.User]{Store: store, ErrorResponse: errorResponse, Excludes: excludeProps}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	ctx.Next()
}

func (middleware UserMiddleware) VerifyParams(ctx iris.Context) {
	requiredParams := "id"
	handler := utils.ErrorHandler[any]{Params: requiredParams}

	kind, message := handler.IsIntParams(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusConflict, errors.New(message))
		return
	}

	if value, err := ctx.Params().GetInt32(requiredParams); err == nil {
		ctx.Values().Set("userId", value)
	}

	ctx.Next()
}

func (middleware UserMiddleware) VerifyBodyContent(ctx iris.Context) {
	validate := utils.UseValidate()
	account := ctx.Values().Get("user").(models.User)
	if !validate.Is(account.Email).Email() {
		ctx.StopWithError(iris.StatusNotAcceptable, errors.New(locale.EMAIL_FORMAT_VIOLATED))
		return
	}

	ctx.Next()
}

func (middleware UserMiddleware) VerifyUniques(ctx iris.Context) {
	service := services.UserService{DB: utils.UseTurso()}
	account := ctx.Values().Get("user").(models.User)
	validate := utils.UseValidate()

	if user, _ := service.FindByEmail(account.Email); !validate.Is(strconv.Itoa(user.Uid)).Undefined() {
		ctx.StopWithError(iris.StatusInternalServerError, errors.New(locale.EMAIL_EXISTED))
		return
	}

	if user, _ := service.FindByUsername(account.Username); !validate.Is(strconv.Itoa(user.Uid)).Undefined() {
		ctx.StopWithError(iris.StatusInternalServerError, errors.New(locale.USERNAME_EXISTED))
		return
	}

	ctx.Next()
}
