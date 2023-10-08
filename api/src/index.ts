import { Elysia } from "elysia";
import { auth, leaf, node, user } from "$routes";
import { cors } from "@elysiajs/cors";

new Elysia()
  .use(
    cors({
      origin: () => true,
      allowedHeaders: ["Content-Type", "Accept", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  )
  .group("/api", (app) => app.use(auth).use(user).use(node).use(leaf))
  .listen(3000);

console.log("🦊 Elysia is running.");
