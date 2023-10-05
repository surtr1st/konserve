import { userModel } from "$models";
import { errorHandlers } from "$plugins";
import Elysia, { NotFoundError, ParseError } from "elysia";

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
        }),
    };
  });
