import { leafControllers } from "$controllers";
import { leafMiddlewares } from "$middlewares";
import Elysia from "elysia";

export const leaf = new Elysia({ name: "leaf@routes" })
  .use(leafControllers)
  .use(leafMiddlewares)
  .get("/leaves", ({ getLeaves }) => getLeaves())
  .group("/leaf", (leaf) =>
    leaf
      .post("/", ({ createLeaf }) => createLeaf(), {
        beforeHandle: ({ validateBody }) => validateBody(),
      })
      .put("/", ({ updateLeaf }) => updateLeaf(), {
        beforeHandle: [
          ({ validateQuery }) => validateQuery(),
          ({ validateBody }) => validateBody(),
        ],
      })
      .delete("/:id", ({ deleteLeaf }) => deleteLeaf(), {
        beforeHandle: ({ isIntParams }) => isIntParams(),
      }),
  );
