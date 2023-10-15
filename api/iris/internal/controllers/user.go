package controllers

import (
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

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

	hashedPassword, hashErr := encrypt.Hash(user.Password)
	if hashErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, hashErr)
		return
	}

	user.Password = hashedPassword
	_, err := controller.useService().Create(user)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusCreated)
}

func (controller UserController) UpdateUser(ctx iris.Context) {
	ternary := utils.Ternary[string]{}
	validate := helpers.UseValidate()

	target := ctx.Values().Get("user").(models.User)
	userId, _ := ctx.Values().GetInt32("userId")

	foundUser, findErr := controller.useService().Find(userId)
	if findErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, findErr)
		return
	}

	foundUser.Email = target.Email
	foundUser.Username = target.Username
	foundUser.Password = target.Password
	foundUser.DisplayName = ternary.AssignAfterCondition(!validate.Is(target.DisplayName).Empty(), target.DisplayName, foundUser.DisplayName)
	foundUser.SecretCode = ternary.AssignAfterCondition(!validate.Is(target.SecretCode).Empty(), target.SecretCode, foundUser.SecretCode)

	_, err := controller.useService().Update(foundUser)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}

func (controller UserController) DeleteUser(ctx iris.Context) {
	userId, _ := ctx.Values().GetInt32("userId")

	_, err := controller.useService().Delete(userId)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}
