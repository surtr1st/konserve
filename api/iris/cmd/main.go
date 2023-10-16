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
		AllowedOrigins:   []string{"*", "http://localhost:5173"},
		AllowedHeaders:   []string{"Content-Type", "Accept", "Authorization"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	}
	api := app.Party("/api")
	api.UseRouter(cors.New(corsOptions))
	handleServer(api)
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
	route.Use(middleware.VerifyToken)
	route.Post("/auth", middleware.VerifyUser, middleware.GenerateToken, auth.Authenticate)
}

func handleUser(route iris.Party) {
	user := controllers.UserController{}
	middleware := middlewares.UserMiddleware{}
	route.Get("/", user.RetrieveUsers)
	route.Post("/register", middleware.VerifyBody, user.CreateUser)
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

func handleServer(route iris.Party) {
	server := controllers.ServerController{}
	route.Delete("/remove-cookie", server.RemoveCookie)
}
