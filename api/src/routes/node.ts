import { Elysia } from "elysia";
import { useDrizzle } from "../config";
import { nodes } from "../db/schema";
import { Node } from "../models";

const db = useDrizzle();

export const node = new Elysia().group("/node", (node) =>
  node
    .get("/", async () => await db.select().from(nodes))
    .post(
      "/",
      async ({ body }) => {
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
