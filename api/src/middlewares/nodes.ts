import { Elysia } from "elysia";
import { guardNode } from "../models";

export const nodeMiddleware = new Elysia({ name: "node@middlewares" })
  .use(guardNode)
  .derive(({ set, body, params }) => {
    const validateBody = () => {
      const { name, userId } = body;
      if (!name || name.length === 0) {
        set.status = 404;
        return { message: "Please provide the name!" };
      }
      if (!userId) {
        set.status = 404;
        return { message: "Unknown node owner!" };
      }
    };
    const isIntParams = () => {
      const { id } = params;
      const regex = new RegExp(/[0-9]/);
      if (!regex.test(id)) {
        set.status = 406;
        return { message: "Invalid params type!" };
      }
    };
    return { validateBody, isIntParams };
  });
