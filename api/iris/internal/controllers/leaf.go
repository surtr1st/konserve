package controllers

import (
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type LeafController struct{ service *services.LeafService }

func (controller *LeafController) useService() services.LeafService {
	leafController := services.LeafService{DB: utils.UseTurso()}
	controller.service = &leafController
	return leafController
}

func (controller LeafController) RetrieveLeaves(ctx iris.Context) {
	leaves, err := controller.useService().Leaves()
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.JSON(leaves)
}

func (controller LeafController) CreateLeaf(ctx iris.Context) {
	leaf := ctx.Values().Get("leaf").(models.Leaf)

	if _, err := controller.useService().Create(leaf); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusCreated)
}

func (controller LeafController) UpdateLeaf(ctx iris.Context) {
	target := ctx.Values().Get("leaf").(models.Leaf)
	id, _ := ctx.Values().GetInt("leafId")

	foundLeaf, findErr := controller.useService().Find(id)
	if findErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, findErr)
		return
	}

	foundLeaf.Username = target.Username
	foundLeaf.Password = target.Password
	if _, err := controller.useService().Update(foundLeaf); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}

func (controller LeafController) DeleteLeaf(ctx iris.Context) {
	id, _ := ctx.Values().GetInt("leafId")

	if _, err := controller.useService().Delete(id); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}
