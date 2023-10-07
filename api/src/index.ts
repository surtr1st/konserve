import { Elysia } from "elysia";
import { auth, leaf, node, user } from "$routes";
import { cors } from "@elysiajs/cors";
// import { CORS_ORIGIN } from "$config";

new Elysia()
  .use(cors({ origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5173/"] }))
  .group("/api", (app) => app.use(auth).use(user).use(node).use(leaf))
  .listen(3000);

console.log("🦊 Elysia is running.");
