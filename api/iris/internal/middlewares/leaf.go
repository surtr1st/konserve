package middlewares

import (
	"errors"
	"konserve/api/internal/constants/kinds"
	"konserve/api/internal/models"
	"konserve/api/internal/utils"
	locale "konserve/api/pkg/localization"

	"github.com/kataras/iris/v12"
)

type LeafMiddleware struct{}

func (middlware LeafMiddleware) VerifyBody(ctx iris.Context) {
	var body models.Leaf

	if err := ctx.ReadJSON(&body); err != nil {
		ctx.StopWithError(iris.StatusInternalServerError, err)
		return
	}

	store := "leaf"
	errorResponse := map[string]string{"username": locale.MISSING_LEAF_USERNAME, "nodeId": locale.MISSING_LEAF_OWNER}
	excludeProps := map[string]string{"id": "id"}

	ctx.Values().Set(store, body)
	handler := utils.ErrorHandler[models.Node]{Store: store, ErrorResponse: errorResponse, Excludes: excludeProps}

	kind, message := handler.ValidateBody(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusNotFound, errors.New(message))
		return
	}

	ctx.Next()
}

func (middleware LeafMiddleware) VerifyParams(ctx iris.Context) {
	requiredParams := "id"
	handler := utils.ErrorHandler[any]{Params: requiredParams}

	kind, message := handler.IsIntParams(ctx)
	if kind != kinds.EMPTY {
		ctx.StopWithError(iris.StatusConflict, errors.New(message))
		return
	}

	if value, err := ctx.Params().GetInt32(requiredParams); err == nil {
		ctx.Values().Set("leafId", value)
	}

	ctx.Next()
}
