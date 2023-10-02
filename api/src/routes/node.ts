import { Elysia } from "elysia";
import { nodeMiddlewares } from "../middlewares";
import { nodeControllers } from "../controllers";

export const node = new Elysia({ name: "node@routes" })
  .use(nodeControllers)
  .get("/nodes", ({ getNodes }) => getNodes())
  .group("/node", (node) =>
    node
      .use(nodeMiddlewares)
      .post("/", ({ createNode }) => createNode(), {
        beforeHandle: ({ validateBody }) => validateBody(),
      })
      .onBeforeHandle(({ isIntParams }) => isIntParams())
      .onBeforeHandle(({ validateBody }) => validateBody())
      .put("/:id", ({ updateNode }) => updateNode())
      .delete("/:id", ({ deleteNode }) => deleteNode(), {
        beforeHandle: ({ isIntParams }) => isIntParams(),
      }),
  );
