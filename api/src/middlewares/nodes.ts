import { Elysia } from "elysia";
import { NodeDTO } from "../models";

export const nodeMiddleware = new Elysia({ name: "node@middlewares" })
  .guard({
    body: NodeDTO,
  })
  .derive(({ set, body, params }) => {
    const { id } = params;
    const { name, userId } = body;
    const validateBody = () => {
      if (!name || name.length === 0) {
        set.status = 404;
        return { message: "Please provide the name!" };
      }
      if (!userId) {
        set.status = 404;
        return { message: "Unknown node owner!" };
      }
    };
    const isIntParams = () => typeof id === "number";
    return { validateBody, isIntParams };
  });
