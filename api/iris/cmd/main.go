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
	// route.Use(verifyToken)
	route.Post("/auth", middleware.VerifyUser, middleware.GenerateToken(signer), auth.Authenticate)
}

func handleUser(route iris.Party) {
	user := controllers.UserController{}
	middleware := middlewares.UserMiddleware{}
	route.Get("/users", user.RetrieveUsers)
	route.Post("/user/register", middleware.VerifyBody, user.CreateUser)
	route.Put("/user/{id}", middleware.VerifyParams, middleware.VerifyBody, user.UpdateUser)
	route.Delete("/user/{id}", middleware.VerifyParams, user.DeleteUser)
}

func handleNode(route iris.Party) {
	node := controllers.NodeController{}
	middleware := middlewares.NodeMiddleware{}
	route.Get("/nodes", node.RetrieveNodes)
	route.Post("/node", middleware.VerifyBody, node.CreateNode)
	route.Put("/node/{id}", middleware.VerifyParams, middleware.VerifyBody, node.UpdateNode)
	route.Delete("/node/{id}", middleware.VerifyParams, node.DeleteNode)
}
