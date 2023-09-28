import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

type AuthParams = {
  username: string;
  password: string;
};

type JWTAuthPayload = {
  userId: string;
  username: string;
};

const MAX_AGE = 86400;
const JWT_CONFIG = {
  name: "jwt",
  secret: "Endless Pain",
};

export const auth = new Elysia()
  .use(jwt(JWT_CONFIG))
  .use(cookie())
  .post(
    "/auth",
    async ({ jwt, body, setCookie }) => {
      const {} = body as AuthParams;
      const token = await jwt.sign(JWT_CONFIG);
      setCookie("jwt.auth", token, {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      return token;
    },
    {
      beforeHandle: async ({ jwt, set, request }) => {
        const authHeader = request.headers.get("authorization");
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
          set.status = 401;
          return "Unauthorized";
        }

        const payload = (await jwt.verify(token)) as JWTAuthPayload;
        if (!payload) {
          set.status = 403;
          return "Invalid token or your token has been expired.";
        }

        return {
          message: "Authenticated",
          user: payload,
        };
      },
    },
  );
