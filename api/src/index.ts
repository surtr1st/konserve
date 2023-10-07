import { Elysia } from "elysia";
import { auth, leaf, node, user } from "$routes";
import { cors } from "@elysiajs/cors";
import { CORS_ORIGIN } from "$config";

new Elysia()
  .use(cors({ origin: CORS_ORIGIN || true }))
  .group("/api", (app) => app.use(auth).use(user).use(node).use(leaf))
  .listen(3000);

console.log(`🦊 Elysia is running. ${CORS_ORIGIN}`);
