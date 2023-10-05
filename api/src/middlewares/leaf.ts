import Elysia from "elysia";
import { leafModel } from "$models";
import { errorHandlers } from "$plugins";

export const leafMiddlewares = new Elysia({ name: "leaf@middlewares" })
  .use(leafModel)
  .use(errorHandlers)
  .guard({ body: "leaf.dto" })
  .derive(({ body, query, validateQueries, validateBodyProps }) => {
    const verifyRequestBody = () =>
      validateBodyProps({
        requestBody: body,
        requiredKeys: ["username", "nodeId"],
      });

    const verifyRequestQueries = () =>
      validateQueries({
        requestQueries: query,
        requiredKeys: ["id", "nodeId"],
      });

    return { verifyRequestBody, verifyRequestQueries };
  });
