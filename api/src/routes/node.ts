import { Elysia } from "elysia";
import { useDrizzle } from "../config";
import { nodes } from "../db/schema";
import { Node } from "../models";

export const node = new Elysia().group("/node", (node) =>
  node
    .decorate("db", useDrizzle())
    .get("/", async ({ db }) => await db.select().from(nodes))
    .post(
      "/",
      async ({ body, db }) => {
        const { name, userId } = body;
        return await db.insert(nodes).values({ name, userId });
      },
      {
        body: Node,
        beforeHandle: ({ set, body }) => {
          const { name, userId } = body;
          if (!name) {
            set.status = 404;
            return "Please provide the name!";
          }
          if (!userId) {
            set.status = 404;
            return "Unknown node owner!";
          }
        },
      },
    ),
);
