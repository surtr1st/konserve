import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { JWT_CONFIG, MAX_AGE } from "../config";
import { authTokenRetriever, databaseServices } from "../plugins";
import { authState } from "../states";

export const authControllers = new Elysia({ name: "auth@controllers" })
  .use(cookie())
  .use(jwt(JWT_CONFIG))
  .use(authState)
  .use(databaseServices)
  .use(authTokenRetriever)
  .derive(({ set, store, jwt, setCookie, useAuthToken }) => {
    const authenticate = async () => {
      const { accessToken: token } = useAuthToken();

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
        throw new Error("Invalid token or your token has been expired.");
      }
    };
    return { authenticate };
  });
