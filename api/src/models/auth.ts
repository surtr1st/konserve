import { Elysia, t } from "elysia";

export const authModel = new Elysia().model({
  auth: t.Partial(
    t.Object({
      username: t.String(),
      password: t.String(),
    }),
  ),
});
