import { userModel } from "$models";
import Elysia, { NotFoundError, ParseError } from "elysia";

export const userMiddlewares = new Elysia({ name: "user@middlewares" })
  .use(userModel)
  .guard({ body: "user.dto" })
  .derive(({ set, body, params }) => {
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
