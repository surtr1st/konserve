import { Elysia } from "elysia";
import { nodes } from "../db/schema";
import { services } from "../plugins";
import { nodeMiddleware } from "../middlewares";
import { eq } from "drizzle-orm";

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
        beforeHandle: ({ validateBody }) => [validateBody()],
      },
    )
    .put(
      "/:id",
      async ({ params, body, db }) => {
        const { id } = params;
        const { name, userId } = body;
        return await db
          .update(nodes)
          .set({ name, userId })
          .where(eq(nodes.id, parseInt(id)))
          .returning({ updatedId: nodes.id });
      },
      {
        beforeHandle: ({ validateBody, isIntParams }) => [
          validateBody(),
          isIntParams(),
        ],
      },
    )
    .delete(
      "/:id",
      async ({ params, db }) => {
        const { id } = params;
        return await db
          .delete(nodes)
          .where(eq(nodes.id, parseInt(id)))
          .returning({ deletedId: nodes.id });
      },
      {
        beforeHandle: ({ isIntParams }) => isIntParams(),
      },
    ),
);
