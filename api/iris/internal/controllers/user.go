package controllers

import (
	"errors"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"
	locale "konserve/api/pkg/localization"
	"strconv"

	"github.com/kataras/iris/v12"
)

type UserController struct{ service *services.UserService }

func (controller *UserController) useService() services.UserService {
	userService := services.UserService{DB: utils.UseTurso()}
	controller.service = &userService
	return userService
}

func (controller UserController) RetrieveUsers(ctx iris.Context) {
	users, err := controller.useService().Users()
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.JSON(users)
}

func (controller UserController) CreateUser(ctx iris.Context) {
	encrypt := utils.UseEncrypt()
	user := ctx.Values().Get("user").(models.User)

	hashedPassword, hashPasswordErr := encrypt.Hash(user.Password)
	hashedSercetCode, hashSecretCodeErr := encrypt.Hash(user.SecretCode)
	if hashPasswordErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, hashPasswordErr)
		return
	}
	if hashSecretCodeErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, hashSecretCodeErr)
		return
	}

	user.Password = hashedPassword
	user.SecretCode = hashedSercetCode

	if _, err := controller.useService().Create(user); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusCreated)
}

func (controller UserController) UpdateUser(ctx iris.Context) {
	ternary := utils.UseTernary[string]()
	validate := utils.UseValidate()

	target := ctx.Values().Get("user").(models.User)
	id, _ := ctx.Values().GetInt("userId")

	foundUser, err := controller.useService().Find(id)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	foundUser.Email = target.Email
	foundUser.Username = target.Username
	foundUser.Password = target.Password
	foundUser.DisplayName = ternary.When(!validate.Is(target.DisplayName).Empty()).Assign(target.DisplayName).Else(foundUser.DisplayName)
	foundUser.SecretCode = ternary.When(!validate.Is(target.SecretCode).Empty()).Assign(target.SecretCode).Else(foundUser.SecretCode)

	if _, err := controller.useService().Update(foundUser); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}

func (controller UserController) DeleteUser(ctx iris.Context) {
	id, _ := ctx.Values().GetInt("userId")

	if _, err := controller.useService().Delete(id); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}

func (controller UserController) IsExisted(ctx iris.Context) {
	validate := utils.UseValidate()
	email := ctx.URLParamDefault("email", "")
	username := ctx.URLParamDefault("username", "")

	if !validate.Is(email).Empty() {
		user, _ := controller.useService().FindByEmail(email)
		if !validate.Is(strconv.Itoa(user.Uid)).Undefined() {
			ctx.StopWithError(iris.StatusNotAcceptable, errors.New(locale.EMAIL_EXISTED))
			return
		}
	}

	if !validate.Is(username).Empty() {
		user, _ := controller.useService().FindByUsername(username)
		if !validate.Is(strconv.Itoa(user.Uid)).Undefined() {
			ctx.StopWithError(iris.StatusNotAcceptable, errors.New(locale.USERNAME_EXISTED))
			return
		}
	}

	ctx.StatusCode(iris.StatusOK)
}
