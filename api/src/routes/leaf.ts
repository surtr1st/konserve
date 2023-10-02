import { leafControllers } from "$controllers";
import { leafMiddlewares } from "$middlewares";
import Elysia from "elysia";

export const leafRoutes = new Elysia({ name: "leaf@routes" })
  .use(leafControllers)
  .use(leafMiddlewares)
  .get("/leaves", ({ getLeaves }) => getLeaves())
  .group("/leaf", (leaf) =>
    leaf
      .post("/", ({ createLeaf }) => createLeaf())
      .put("/", ({ updateLeaf }) => updateLeaf())
      .delete("/:id", ({ deleteLeaf }) => deleteLeaf()),
  );
