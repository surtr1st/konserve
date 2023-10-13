package main

import (
  "github.com/kataras/iris/v12"
  "github.com/iris-contrib/middleware/cors"
) 

func main() {
  app := iris.New()
  corsOptions := cors.Options {
    AllowedOrigins: []string { "http://localhost:5173" },
    AllowedHeaders: []string { "Content-Type", "Accept", "Authorization" },
    AllowedMethods: []string { "GET", "POST", "PUT", "DELETE", "OPTIONS" },
    AllowCredentials: true,
  }
  app.Party("/api")
  app.UseRouter(cors.New(corsOptions))
  app.Listen(":4000")
}
