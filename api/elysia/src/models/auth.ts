import { Elysia, t } from "elysia";

export const Auth = t.Partial(
  t.Object({
    username: t.String(),
    password: t.String(),
  }),
);
export const authModel = new Elysia().guard({
  body: Auth,
});
