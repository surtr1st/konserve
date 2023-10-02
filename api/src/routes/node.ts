import { Elysia } from "elysia";
import { isIntParams, validateBody } from "$middlewares";
import { nodeControllers } from "$controllers";

export const node = new Elysia({ name: "node@routes" })
  .use(nodeControllers)
  .get("/nodes", ({ getNodes }) => getNodes())
  .group("/node", (node) =>
    node
      .post("/", ({ createNode }) => createNode(), {
        beforeHandle: validateBody,
      })
      .put("/:id", ({ updateNode }) => updateNode(), {
        beforeHandle: [isIntParams, validateBody],
      })
      .delete("/:id", ({ deleteNode }) => deleteNode(), {
        beforeHandle: isIntParams,
      }),
  );
