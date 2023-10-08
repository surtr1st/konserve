import { Elysia } from "elysia";
import { auth, leaf, node, user } from "$routes";
import { cors } from "@elysiajs/cors";
import { ALLOWED_ORIGIN } from "$config";

new Elysia()
  .use(
    cors({
      origin: (req: Request): boolean => {
        const origin = req.headers.get("origin");
        if (!origin) return false;
        return origin === ALLOWED_ORIGIN;
      },
      allowedHeaders: ["Content-Type", "Accept", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  )
  .group("/api", (app) => app.use(auth).use(user).use(node).use(leaf))
  .listen(3000);

console.log("🦊 Elysia is running.");
