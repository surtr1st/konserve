package main

import (
  "github.com/kataras/iris/v12"
  "github.com/iris-contrib/middleware/cors"
  "konserve/api/internal/services/user"
) 

func main() {
  app := iris.New()
  corsOptions := cors.Options {
    AllowedOrigins: []string { "http://localhost:5173" },
    AllowedHeaders: []string { "Content-Type", "Accept", "Authorization" },
    AllowedMethods: []string { "GET", "POST", "PUT", "DELETE", "OPTIONS" },
    AllowCredentials: true,
  }
  api := app.Party("/api")
  api.UseRouter(cors.New(corsOptions))
  api.Get("/users",func (ctx iris.Context) {
    users, err := user.Users()
    if err != nil {
      message := iris.Map { "message": err.Error() }
      ctx.JSON(message)
      return
    }
    ctx.JSON(users)
  })
  app.Listen(":4000")
}
