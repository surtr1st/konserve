package controllers

import (
	"konserve/api/internal/services"
	"konserve/api/internal/utils"

	"github.com/kataras/iris/v12"
)

type NodeController struct{ service *services.NodeService }

func (ctrl *NodeController) useService() *services.NodeService {
	services := &services.NodeService{DB: utils.UseTurso()}
	ctrl.service = services
	return services
}

func (ctrl NodeController) RetrieveNodes(ctx iris.Context) {
	nodes, err := ctrl.useService().Nodes()
	if err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	ctx.JSON(nodes)
}
