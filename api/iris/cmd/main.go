package main

import (
	"konserve/api/internal/controllers"
	"konserve/api/internal/middlewares"
	"konserve/api/internal/utils"
	"time"

	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

func main() {
	app := iris.New()
	corsOptions := cors.Options{
		AllowedOrigins:   []string{"*", "http://localhost:5173"},
		AllowedHeaders:   []string{"Content-Type", "Accept", "Authorization"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	}
	api := app.Party("/api")
	api.UseRouter(cors.New(corsOptions))
	handleAuth(api)
	handleUser(api)
	handleNode(api)
	app.Listen(":4000")
}

func handleAuth(route iris.Party) {
	auth := controllers.AuthController{}
	middleware := middlewares.AuthMiddleware{}
	signer := jwt.NewSigner(jwt.HS256, utils.SigKey, time.Minute)
	// verifier := jwt.NewVerifier(jwt.HS256, utils.SigKey)
	// verifier.WithDefaultBlocklist()
	// verifyToken := verifier.Verify(func() interface{} {
	// 	return new(utils.TokenClaims)
	// })
	route.Post("/auth", middleware.VerifyUser, middleware.GenerateToken(signer), auth.Authenticate)
	// route.Use(verifyToken)
}

func handleUser(route iris.Party) {
	user := controllers.UserController{}
	middleware := middlewares.UserMiddleware{}
	route.Get("/users", user.RetrieveUsers)
	route.Post("/user/register", middleware.ValidateBody, user.CreateUser)
	route.Put("/user/{id}", middleware.ValidateParams, middleware.ValidateBody, user.UpdateUser)
	route.Delete("/user/{id}", middleware.ValidateParams, user.DeleteUser)
}

func handleNode(route iris.Party) {
	node := controllers.NodeController{}
	route.Get("/nodes", node.RetrieveNodes)
}
