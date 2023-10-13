package main

import (
	"github.com/kataras/iris/v12"
	"github.com/iris-contrib/middleware/cors"
	"konserve/api/internal/controllers"
	"konserve/api/internal/middlewares"
) 

func main() {
  app := iris.New()
  corsOptions := cors.Options {
    AllowedOrigins: []string { "*", "http://localhost:5173" },
    AllowedHeaders: []string { "Content-Type", "Accept", "Authorization" },
    AllowedMethods: []string { "GET", "POST", "PUT", "DELETE", "OPTIONS" },
    AllowCredentials: true,
  }
  api := app.Party("/api")
  api.UseRouter(cors.New(corsOptions))

  user := controllers.UserController {}
  userMiddleware := middlewares.UserMiddleware {}
  api.Get("/users", user.RetrieveUsers)
  api.Post("/user/register", userMiddleware.ValidateBody, user.CreateUser)
  app.Listen(":4000")
}
