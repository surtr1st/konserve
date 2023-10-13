package controllers

import (
	"fmt"
	"konserve/api/internal/models"
	"konserve/api/internal/services"

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
	target := ctx.Values().Get("target").(models.User)
	_, err := service.UpdateUser(target)
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}
	message := iris.Map{"message": fmt.Sprintf("Updated user %d", target.Uid)}
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
