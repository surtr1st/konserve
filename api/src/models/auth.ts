import { Elysia, t } from "elysia";

export const Auth = t.Object({
  username: t.String(),
  password: t.String(),
});

export const guardAuth = new Elysia().state({ userId: 0 }).guard({
  body: Auth,
});
