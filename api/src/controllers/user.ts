import { userModel } from "$models";
import Elysia from "elysia";

export const userControllers = new Elysia({ name: "user@controllers" })
  .use(userModel)
  .guard({ body: "user.dto" })
  .derive(({ set, body, params }) => {
    return {};
  });
