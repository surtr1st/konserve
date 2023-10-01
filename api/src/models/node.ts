import { Elysia, t } from "elysia";

export const Node = t.Object({
  id: t.Integer(),
  name: t.String(),
  userId: t.Integer(),
});

export const NodeDTO = t.Partial(t.Omit(Node, ["id"]));

export const guardNode = new Elysia().guard({
  body: NodeDTO,
});
