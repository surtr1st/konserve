import { Elysia } from "elysia";
import { nodes } from "../db/schema";
import { NodeDTO } from "../models";
import { services } from "../plugins";
import { nodeMiddleware } from "../middlewares";

export const node = new Elysia().group("/node", (node) =>
  node
    .use(services)
    .use(nodeMiddleware)
    .get("/", async ({ db }) => await db.select().from(nodes))
    .post(
      "/",
      async ({ set, body, db }) => {
        set.status = 201;
        const { name, userId } = body;
        return await db.insert(nodes).values({ name, userId });
      },
      {
        body: NodeDTO,
        beforeHandle: ({ validateBody }) => [validateBody()],
      },
    ),
);
