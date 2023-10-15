package controllers

import (
	"konserve/api/internal/models"
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type NodeController struct{ service *services.NodeService }

func (controller *NodeController) useService() services.NodeService {
	nodeService := services.NodeService{DB: utils.UseTurso()}
	controller.service = &nodeService
	return nodeService
}

func (controller NodeController) RetrieveNodes(ctx iris.Context) {
	nodes, err := controller.useService().Nodes()
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.JSON(nodes)
}

func (controller NodeController) CreateNode(ctx iris.Context) {
	node := ctx.Values().Get("node").(models.Node)

	newNode := models.Node{
		Name: node.Name,
		Uid:  node.Uid,
	}

	if _, err := controller.useService().Create(newNode); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusCreated)
}

func (controller NodeController) UpdateNode(ctx iris.Context) {
	target := ctx.Values().Get("node").(models.Node)
	nodeId, _ := ctx.Values().GetInt32("nodeId")

	foundNode, findErr := controller.useService().Find(nodeId)
	if findErr != nil {
		ctx.StopWithError(iris.StatusInternalServerError, findErr)
		return
	}

	foundNode.Name = target.Name
	if _, err := controller.useService().Update(foundNode); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}

func (controller NodeController) DeleteNode(ctx iris.Context) {
	nodeId, _ := ctx.Values().GetInt32("nodeId")

	if _, err := controller.useService().Delete(nodeId); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.StatusCode(iris.StatusOK)
}
