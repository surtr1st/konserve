import Elysia from "elysia";
import { leafControllers } from "$controllers";
import { leafMiddlewares } from "$middlewares";

export const leaf = new Elysia({ name: "leaf@routes" })
  .use(leafControllers)
  .use(leafMiddlewares)
  .get("/leaves", ({ getLeaves }) => getLeaves())
  .group("/leaf", (leaf) =>
    leaf
      .post("/", ({ createLeaf }) => createLeaf(), {
        beforeHandle: ({ verifyRequestBody }) => verifyRequestBody(),
      })
      .put("/", ({ updateLeaf }) => updateLeaf(), {
        beforeHandle: [
          ({ verifyRequestQueries }) => verifyRequestQueries(),
          ({ verifyRequestBody }) => verifyRequestBody(),
        ],
      })
      .delete("/:id", ({ deleteLeaf }) => deleteLeaf(), {
        beforeHandle: ({ isIntParams }) => isIntParams(),
      }),
  );
