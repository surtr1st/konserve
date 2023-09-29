import { Elysia } from "elysia";
import { useDrizzle } from "../config";
import { nodes } from "../db/schema";
import { NodeDTO } from "../models";

export const node = new Elysia().group("/node", (node) =>
  node
    .decorate("db", useDrizzle())
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
        beforeHandle: ({ set, body }) => {
          const { name, userId } = body;
          if (!name || name.length === 0) {
            set.status = 404;
            return { message: "Please provide the name!" };
          }
          if (!userId) {
            set.status = 404;
            return { message: "Unknown node owner!" };
          }
        },
      },
    ),
);
