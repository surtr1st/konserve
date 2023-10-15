package controllers

import (
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
