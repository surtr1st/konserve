import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { JWT_CONFIG, MAX_AGE } from "$config";
import { databaseServices } from "$plugins";
import { authState } from "$states";

export const authControllers = new Elysia({ name: "auth@controllers" })
  .use(cookie())
  .use(jwt(JWT_CONFIG))
  .use(authState)
  .use(databaseServices)
  .derive(({ set, request, store, jwt, setCookie }) => {
    const authenticate = async () => {
      const authHeader = request.headers.get("authorization");
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        const accessToken = await jwt.sign({
          whologin: `User#${store.userId}`,
        });
        setCookie("jwt.auth", accessToken, {
          httpOnly: true,
          maxAge: MAX_AGE,
        });
        return {
          accessToken,
          userId: store.userId,
        };
      }

      const payload = await jwt.verify(token as string);
      if (!payload) {
        set.status = 403;
        return { message: "Invalid token or your token has been expired." };
      }
    };
    return { authenticate };
  });
