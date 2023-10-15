package middlewares

import (
	"errors"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	locale "konserve/api/pkg/localization"

	"github.com/kataras/iris/v12"
)

type NodeMiddleware struct{}

func (middlware NodeMiddleware) VerifyBody(ctx iris.Context) {
	var body models.Node

	if err := ctx.ReadJSON(&body); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	store := "node"
	errorResponse := map[string]string{"name": locale.MISSING_NODE_NAME, "uid": locale.MISSING_NODE_OWNER}
	excludeProps := map[string]string{"id": "id"}

	ctx.Values().Set(store, body)
	handler := helpers.ErrorHandler[models.Node]{Store: store, ErrorResponse: errorResponse, Excludes: excludeProps}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	ctx.Next()
}

func (middleware NodeMiddleware) VerifyParams(ctx iris.Context) {
	requiredParams := "id"
	handler := helpers.ErrorHandler[any]{Params: requiredParams}

	kind, message := handler.IsIntParams(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusConflict, errors.New(message))
		return
	}

	if value, err := ctx.Params().GetInt32(requiredParams); err == nil {
		ctx.Values().Set("nodeId", value)
	}

	ctx.Next()
}
