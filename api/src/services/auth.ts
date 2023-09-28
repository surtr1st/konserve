import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

export const auth = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "Endless Pain",
    }),
  )
  .use(cookie())
  .get("/sign/:name", async ({ jwt, setCookie, params }) => {
    const token = await jwt.sign(params);
    setCookie("auth", token, {
      httpOnly: true,
      maxAge: 7 * 86400,
    });
    return token;
  });
