import { Elysia } from "elysia";
import { NodeDTO } from "../models";

export const nodeMiddleware = new Elysia({ name: "node@middlewares" })
  .guard({
    body: NodeDTO,
  })
  .derive(({ set, body }) => {
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
    return { validateBody };
  });
