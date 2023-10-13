package controllers

import (
	"fmt"
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type UserController struct{}

var service = services.UserService{}

func (ctrl UserController) RetrieveUsers(ctx iris.Context) {
	users, err := service.Users()
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.JSON(users)
}

func (ctrl UserController) CreateUser(ctx iris.Context) {
	user := ctx.Values().Get("user").(models.User)
	_, err := service.CreateUser(user)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": "Created new user!"}
	ctx.JSON(message)
}

func (ctrl UserController) UpdateUser(ctx iris.Context) {
	t := utils.Ternary[string]{}
	target := ctx.Values().Get("user").(models.User)
	userId := ctx.Values().Get("userId").(int32)

	foundUser, findErr := service.FindUser(userId)
	if findErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, findErr)
		return
	}

	foundUser.Email = target.Email
	foundUser.Username = target.Username
	foundUser.Password = target.Password

	isDisplayNameEmpty := target.DisplayName == ""
	isSecretCodeEmpty := target.SecretCode == ""

	foundUser.DisplayName = t.AssignAfterCondition(!isDisplayNameEmpty, target.DisplayName, foundUser.DisplayName)
	foundUser.SecretCode = t.AssignAfterCondition(!isSecretCodeEmpty, target.SecretCode, foundUser.SecretCode)

	_, err := service.UpdateUser(foundUser)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": fmt.Sprintf("Updated user %d", foundUser.Uid)}
	ctx.JSON(message)
}

func (ctrl UserController) DeleteUser(ctx iris.Context) {
	userId := ctx.Values().Get("userId").(int32)
	_, err := service.DeleteUser(userId)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": fmt.Sprintf("Deleted user %d", userId)}
	ctx.JSON(message)
}
