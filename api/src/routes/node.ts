import { Elysia } from "elysia";
import { nodeMiddleware } from "../middlewares";
import { nodeController } from "../controllers/node";

export const node = new Elysia().group("/node", (node) =>
  node
    .use(nodeController)
    .use(nodeMiddleware)
    .get("/", ({ getNodes }) => getNodes())
    .onBeforeHandle(({ validateBody }) => validateBody())
    .post("/", ({ createNode }) => createNode())
    .onBeforeHandle(({ isIntParams }) => isIntParams())
    .onBeforeHandle(({ validateBody }) => validateBody())
    .put("/:id", ({ updateNode }) => updateNode())
    .onBeforeHandle(({ isIntParams }) => isIntParams())
    .delete("/:id", ({ deleteNode }) => deleteNode()),
);
