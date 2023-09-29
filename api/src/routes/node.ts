import { Elysia } from "elysia";
import { useDrizzle } from "../config";
import { nodes } from "../db/schema";
import { Node } from "../models";

export const node = new Elysia().group("/node", (node) =>
  node
    .state({ db: useDrizzle() })
    .get("/", async ({ store }) => await store.db.select().from(nodes))
    .post(
      "/",
      async ({ body, store }) => {
        const { name, userId } = body;
        return await store.db.insert(nodes).values({ name, userId });
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
