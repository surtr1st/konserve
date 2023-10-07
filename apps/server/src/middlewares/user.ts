import { userModel } from "../models";
import { errorHandlers } from "../plugins";
import { Elysia } from "elysia";

export const userMiddlewares = new Elysia({ name: "user@middlewares" })
  .use(userModel)
  .use(errorHandlers)
  .guard({ body: "user.dto" })
  .derive(({ body, validateBodyProps }) => {
    return {
      verifyRequestBody: () =>
        validateBodyProps({
          requestBody: body,
          requiredKeys: ["email", "username", "password"],
          responseError: {
            email: "Email does not valid! Please re-check your email!",
            username: "Please provide your username!",
            password: "Password is empty! Please fill your password up!",
          },
        }),
    };
  });
