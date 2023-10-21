package main

import (
	"konserve/api/internal/controllers"
	"konserve/api/internal/middlewares"

	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
)

func main() {
	app := iris.New()
	corsOptions := cors.Options{
		AllowedOrigins:   []string{"http://127.0.0.1:5173"},
		AllowedHeaders:   []string{"Content-Type", "Accept", "Authorization"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	}
	api := app.Party("/api")
	api.UseRouter(cors.New(corsOptions))
	handleAuth(api)

	userRoutes := api.Party("/users")
	handleUser(userRoutes)

	nodeRoutes := api.Party("/nodes")
	handleNode(nodeRoutes)

	leafRoutes := api.Party("/leaves")
	handleLeaf(leafRoutes)

	app.Listen(":4000")
}

func handleAuth(route iris.Party) {
	auth := controllers.AuthController{}
	middleware := middlewares.AuthMiddleware{}
	route.UseRouter(middleware.VerifyToken)
	route.Post("/auth", middleware.VerifyUser, middleware.GenerateToken, auth.Authenticate)
	route.Get("/auth/verify", auth.VerifyAuthorization)
}

func handleUser(route iris.Party) {
	user := controllers.UserController{}
	middleware := middlewares.UserMiddleware{}
	route.Get("/", user.RetrieveUsers)
	route.Get("/exist", user.IsExisted)
	route.Post("/register", middleware.VerifyBody, middleware.VerifyBodyContent, middleware.VerifyUniques, user.CreateUser)
	route.Put("/{id}", middleware.VerifyParams, middleware.VerifyBody, user.UpdateUser)
	route.Delete("/{id}", middleware.VerifyParams, user.DeleteUser)
}

func handleNode(route iris.Party) {
	node := controllers.NodeController{}
	middleware := middlewares.NodeMiddleware{}
	verify := middlewares.VerifyMiddleware{}
	route.Get("/", node.RetrieveNodes)
	route.Post("/", middleware.VerifyBody, node.CreateNode)
	route.Put("/{id}", middleware.VerifyParams, middleware.VerifyBody, node.UpdateNode)
	route.Delete("/{id}", verify.Verify, middleware.VerifyParams, node.DeleteNode)
}

func handleLeaf(route iris.Party) {
	leaf := controllers.LeafController{}
	middleware := middlewares.LeafMiddleware{}
	verify := middlewares.VerifyMiddleware{}
	route.Get("/", verify.Verify, leaf.RetrieveLeaves)
	route.Post("/", middleware.VerifyBody, leaf.CreateLeaf)
	route.Put("/{id}", middleware.VerifyParams, middleware.VerifyBody, leaf.UpdateLeaf)
	route.Delete("/{id}", middleware.VerifyParams, leaf.DeleteLeaf)
}
