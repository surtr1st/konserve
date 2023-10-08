import { Elysia } from "elysia";
import { auth, leaf, node, user } from "$routes";
import { cors } from "@elysiajs/cors";
import { CORS_ORIGIN } from "$config";

const useWildcard = () => true;

new Elysia()
  .use(
    cors({
      origin: CORS_ORIGIN ? CORS_ORIGIN : useWildcard(),
      allowedHeaders: ["Content-Type", "Accept", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  )
  .group("/api", (app) => app.use(auth).use(user).use(node).use(leaf))
  .listen(3000);

console.log("🦊 Elysia is running.");
console.log(CORS_ORIGIN ? CORS_ORIGIN : useWildcard());
console.log(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN : useWildcard(),
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
