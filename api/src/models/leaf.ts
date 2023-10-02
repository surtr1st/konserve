import Elysia, { t } from "elysia";

export const Leaf = t.Object({
  id: t.Integer(),
  username: t.String(),
  password: t.String(),
  nodeId: t.Integer(),
});
export const LeafDTO = t.Partial(t.Omit(Leaf, ["id"]));
export const leafModel = new Elysia().guard({ body: Leaf });
export const leafDto = new Elysia().guard({ body: LeafDTO });
