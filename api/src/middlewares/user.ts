import { userModel } from "$models";
import Elysia, { NotFoundError } from "elysia";

export const userMiddlewares = new Elysia({ name: "user@middlewares" })
  .use(userModel)
  .guard({ body: "user.dto" })
  .derive(({ set, body }) => {
    const validateBody = () => {
      const { email, username, password } = body;
      if (!email) {
        set.status = 404;
        throw new NotFoundError("Please provide email!");
      }
      if (!username) {
        set.status = 404;
        throw new NotFoundError("Please provide username!");
      }
      if (!password) {
        set.status = 404;
        throw new NotFoundError("Please provide password!");
      }
    };
    return { validateBody };
  });
