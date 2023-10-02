import { Elysia, NotFoundError, ParseError } from "elysia";
import { nodeModel } from "$models";

export const nodeMiddlewares = new Elysia({ name: "node@middlewares" })
  .use(nodeModel)
  .guard({ body: "node.dto" })
  .derive(({ set, body, params }) => {
    const validateBody = () => {
      const { name, userId } = body;
      if (!name) {
        set.status = 404;
        throw new NotFoundError("Please provide the name!");
      }
      if (!userId) {
        set.status = 404;
        throw new NotFoundError("Unknown node owner!");
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
    return { validateBody, isIntParams };
  });
