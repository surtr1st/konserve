import { Elysia } from "elysia";
import { leafModel } from "../models";
import { authTokenRetriever, errorHandlers } from "../plugins";
import { verification } from "./verification";

export const leafMiddlewares = new Elysia({ name: "leaf@middlewares" })
  .use(leafModel)
  .use(errorHandlers)
  .use(authTokenRetriever)
  .use(verification)
  .guard({ body: "leaf.dto" })
  .derive(
    ({
      body,
      query,
      validateQueries,
      validateBodyProps,
      useAuthToken,
      verifySecretCode,
    }) => {
      return {
        verifyRequestBody: () =>
          validateBodyProps({
            requestBody: body,
            requiredKeys: ["username"],
            responseError: {
              username: "Please provide the name",
            },
          }),
        verifyRequestQueries: () =>
          validateQueries({
            requestQueries: query,
            requiredKeys: ["id", "nodeId"],
            responseError: {
              id: "Unknown leaf!",
              nodeId: "Unknown leaf owner! Please provide its node!",
            },
          }),
        verifyUserSecret: async () => {
          const { userId, secretCode } = useAuthToken();
          await verifySecretCode(
            parseInt(userId as string),
            secretCode as string,
          );
        },
      };
    },
  );
