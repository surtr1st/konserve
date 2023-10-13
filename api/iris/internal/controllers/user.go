package controllers

import (
	"fmt"
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type UserController struct{ service *services.UserService }

func (ctrl *UserController) useService() *services.UserService {
	services := &services.UserService{DB: utils.UseTurso()}
	ctrl.service = services
	return services
}

func (ctrl UserController) RetrieveUsers(ctx iris.Context) {
	users, err := ctrl.useService().Users()
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.JSON(users)
}

func (ctrl UserController) CreateUser(ctx iris.Context) {
	encrypt := utils.Encrypto{}
	user := ctx.Values().Get("user").(models.User)
	hashedPassword, hashErr := encrypt.Hash(user.Password)
	if hashErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, hashErr)
		return
	}
	user.Password = hashedPassword
	_, err := ctrl.useService().CreateUser(user)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": "Created new user!"}
	ctx.JSON(message)
}

func (ctrl UserController) UpdateUser(ctx iris.Context) {
	t := utils.Ternary[string]{}
	v := helpers.Validate{}
	target := ctx.Values().Get("user").(models.User)
	userId := ctx.Values().Get("userId").(int32)

	foundUser, findErr := ctrl.useService().FindUser(userId)
	if findErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, findErr)
		return
	}

	foundUser.Email = target.Email
	foundUser.Username = target.Username
	foundUser.Password = target.Password
	foundUser.DisplayName = t.AssignAfterCondition(!v.IsEmpty(target.DisplayName), target.DisplayName, foundUser.DisplayName)
	foundUser.SecretCode = t.AssignAfterCondition(!v.IsEmpty(target.SecretCode), target.SecretCode, foundUser.SecretCode)

	_, err := ctrl.useService().UpdateUser(foundUser)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": fmt.Sprintf("Updated user %d", foundUser.Uid)}
	ctx.JSON(message)
}

func (ctrl UserController) DeleteUser(ctx iris.Context) {
	userId := ctx.Values().Get("userId").(int32)
	_, err := ctrl.useService().DeleteUser(userId)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": fmt.Sprintf("Deleted user %d", userId)}
	ctx.JSON(message)
}
