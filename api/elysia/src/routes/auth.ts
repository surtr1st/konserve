import { Elysia } from "elysia";
import { authControllers } from "$controllers";
import { authMiddlewares } from "$middlewares";

export const auth = new Elysia({ name: "auth@routes" })
  .use(authControllers)
  .use(authMiddlewares)
  .post("/auth", ({ authenticate }) => authenticate(), {
    beforeHandle: [
      ({ body, validateBodyProps }) =>
        validateBodyProps({
          requestBody: body,
          requiredKeys: ["username", "password"],
          responseError: {
            username: "Username is empty!",
            password: "Password is empty!",
          },
        }),
      ({ verifyUser }) => verifyUser(),
    ],
  });
