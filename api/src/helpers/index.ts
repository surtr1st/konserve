import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { JWT_CONFIG } from "../config";

export function verifyToken() {
  return new Elysia()
    .use(jwt(JWT_CONFIG))
    .onBeforeHandle(async ({ jwt, request, set }) => {
      const authHeader = request.headers.get("authorization");
      const token = authHeader && authHeader.split(" ")[1];
      const payload = await jwt.verify(token as string);
      if (!payload) {
        set.status = 403;
        return "Forbidden";
      }
    });
}
