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
  handleUser(api)
  app.Listen(":4000")
}

func handleUser(route iris.Party)  {
  user := controllers.UserController {}
  userMiddleware := middlewares.UserMiddleware {}
  route.Get("/users", user.RetrieveUsers)
  route.Post("/user/register", userMiddleware.ValidateBody, user.CreateUser)
  route.Put("/user/{id:int32}")
  route.Delete("/user")
}
