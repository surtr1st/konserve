package middlewares

import (
	"konserve/api/internal/models"

	"github.com/kataras/iris/v12"
)

type UserMiddleware struct {}

func (middleware UserMiddleware) ValidateBody(ctx iris.Context){
  var body models.User
  readErr := ctx.ReadJSON(&body)
  if readErr != nil {
    ctx.StopWithError(iris.StatusInternalServerError, readErr)
    return
  }
  if body.Email == "" {
    ctx.StopWithJSON(iris.StatusNotFound, iris.Map { "message": "Email is empty!" })
    return
  }
  if body.Username == "" {
    ctx.StopWithJSON(iris.StatusNotFound, iris.Map { "message": "Username is empty!" })
    return
  }
  if body.Password == "" {
    ctx.StopWithJSON(iris.StatusNotFound, iris.Map { "message": "Password is empty!" })
    return
  }
  ctx.Values().Set("user", body)
  ctx.Next()
}

