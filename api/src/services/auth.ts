import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { useDrizzle } from "../config";
import { users } from "../db/schema";
import { and, eq } from "drizzle-orm";

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

      const payload = (await jwt.verify(token as string)) as JWTAuthPayload;
      if (!payload) {
        set.status = 403;
        return "Invalid token or your token has been expired.";
      }

      return "Authorized";
    },
    {
      beforeHandle: async ({ set, body }) => {
        const { username, password } = body as AuthParams;
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
