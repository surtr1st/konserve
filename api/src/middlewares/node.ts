import { Elysia } from "elysia";
import { nodeModel } from "$models";
import { errorHandlers } from "$plugins";

export const nodeMiddlewares = new Elysia({ name: "node@middlewares" })
  .use(nodeModel)
  .use(errorHandlers)
  .guard({ body: "node.dto" })
  .derive(({ body, validateBodyProps }) => {
    return {
      verifyRequestBody: () =>
        validateBodyProps({
          requestBody: body,
          requiredKeys: ["name", "userId"],
          responseError: {
            name: "Please provide the name!",
            userId: "Unknown node owner!",
          },
        }),
    };
  });
