import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { and, eq } from "drizzle-orm";
import { useDrizzle } from "../config";
import { users } from "../db/schema";
import { Auth } from "../models";
import { JWT_SECRET } from "../config";

const MAX_AGE = 86400;
const JWT_CONFIG = {
  name: "jwt",
  secret: JWT_SECRET,
};

export const auth = new Elysia()
  .use(jwt(JWT_CONFIG))
  .use(cookie())
  .post(
    "/auth",
    async ({ set, request, jwt, setCookie }) => {
      const authHeader = request.headers.get("authorization");
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        const accessToken = await jwt.sign(JWT_CONFIG);
        setCookie("jwt.auth", accessToken, {
          httpOnly: true,
          maxAge: MAX_AGE,
        });
        return {
          accessToken,
        };
      }

      const payload = await jwt.verify(token as string);
      if (!payload) {
        set.status = 403;
        return "Invalid token or your token has been expired.";
      }

      return "Authorized";
    },
    {
      body: Auth,
      beforeHandle: async ({ set, body }) => {
        const { username, password } = body;
        const db = useDrizzle();

        const [user] = await db
          .select()
          .from(users)
          .where(
            and(eq(users.username, username), eq(users.password, password)),
          )
          .limit(1);

        if (!user) {
          set.status = 404;
          return "User not found!";
        }
      },
    },
  );
