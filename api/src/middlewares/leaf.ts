import { leafModel } from "$models";
import Elysia, { NotFoundError, ParseError } from "elysia";

export const leafMiddlewares = new Elysia({ name: "leaf@middlewares" })
  .use(leafModel)
  .guard({ body: "leaf.dto" })
  .derive(({ set, body, params, query }) => {
    const validateBody = () => {
      const { username, nodeId } = body;
      if (!username) {
        set.status = 404;
        throw new NotFoundError("Please provide the name!");
      }
      if (!nodeId) {
        set.status = 404;
        throw new NotFoundError("Unknown leaf owner, please provide its node!");
      }
    };
    const isIntParams = () => {
      const { id } = params;
      const regex = new RegExp(/[0-9]/);
      if (!regex.test(id)) {
        set.status = 400;
        throw new ParseError("Invalid params type!");
      }
    };
    const validateQuery = () => {
      const { id, nodeId } = query;
      if (!id) {
        set.status = 404;
        throw new NotFoundError("Unknown leaf!");
      }
      if (!nodeId) {
        set.status = 404;
        throw new NotFoundError("Unknown leaf owner, please provide its node!");
      }
    };
    return { validateBody, isIntParams, validateQuery };
  });
