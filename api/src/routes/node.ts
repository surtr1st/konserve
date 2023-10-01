import { Elysia } from "elysia";
import { nodeMiddlewares } from "../middlewares";
import { nodeControllers } from "../controllers";

export const node = new Elysia({ name: "node@routes" }).group("/node", (node) =>
  node
    .use(nodeControllers)
    .use(nodeMiddlewares)
    .get("/", ({ getNodes }) => getNodes())
    .onBeforeHandle(({ validateBody }) => validateBody())
    .post("/", ({ createNode }) => createNode())
    .onBeforeHandle(({ isIntParams }) => isIntParams())
    .onBeforeHandle(({ validateBody }) => validateBody())
    .put("/:id", ({ updateNode }) => updateNode())
    .onBeforeHandle(({ isIntParams }) => isIntParams())
    .delete("/:id", ({ deleteNode }) => deleteNode()),
);
