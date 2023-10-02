import { Elysia } from "elysia";
import { nodeMiddlewares } from "$middlewares";
import { nodeControllers } from "$controllers";

export const node = new Elysia({ name: "node@routes" })
  .use(nodeControllers)
  .use(nodeMiddlewares)
  .get("/nodes", ({ getNodes }) => getNodes())
  .group("/node", (node) =>
    node
      .post("/", ({ createNode }) => createNode(), {
        beforeHandle: ({ validateBody }) => validateBody(),
      })
      .put("/:id", ({ updateNode }) => updateNode(), {
        beforeHandle: [
          ({ isIntParams }) => isIntParams(),
          ({ validateBody }) => validateBody(),
        ],
      })
      .delete("/:id", ({ deleteNode }) => deleteNode(), {
        beforeHandle: ({ isIntParams }) => isIntParams(),
      }),
  );
