import { Elysia } from "elysia";
import { nodeModel } from "../models";
import { authTokenRetriever, errorHandlers } from "../plugins";
import { verification } from "./verification";

export const nodeMiddlewares = new Elysia({ name: "node@middlewares" })
  .use(nodeModel)
  .use(errorHandlers)
  .use(authTokenRetriever)
  .use(verification)
  .guard({ body: "node.dto" })
  .derive(({ body, validateBodyProps, useAuthToken, verifySecretCode }) => {
    return {
      verifyUserSecret: async () => {
        const { userId, secretCode } = useAuthToken();
        await verifySecretCode(
          parseInt(userId as string),
          secretCode as string,
        );
      },
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
