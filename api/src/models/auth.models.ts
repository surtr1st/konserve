import { t } from "elysia";

export const Auth = t.Object({
  username: t.String(),
  password: t.String(),
});
