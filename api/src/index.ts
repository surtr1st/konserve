import { Elysia } from "elysia";
import { auth, leaf, node, user } from "$routes";
import { cors } from "@elysiajs/cors";
import { CORS_ORIGIN } from "$config";

new Elysia()
  .group("/api", (app) =>
    app
      .use(cors({ origin: CORS_ORIGIN || true }))
      .use(auth)
      .use(user)
      .use(node)
      .use(leaf),
  )
  .listen(3000);

console.log("🦊 Elysia is running.");
