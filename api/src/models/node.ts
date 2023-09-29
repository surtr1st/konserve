import { t } from "elysia";

export const Node = t.Object({
  id: t.Integer(),
  name: t.String(),
  userId: t.Integer(),
});
