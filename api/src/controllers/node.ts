import { Elysia } from "elysia";
import { eq } from "drizzle-orm";
import { databaseServices } from "$plugins";
import { nodes } from "$db/schema";
import { nodeDto } from "$models";

export const nodeControllers = new Elysia({ name: "node@controllers" })
  .use(nodeDto)
  .use(databaseServices)
  .guard({ body: "node.dto" })
  .derive(({ set, params, body, db }) => {
    const getNodes = async () => await db.select().from(nodes);
    const createNode = async () => {
      set.status = 201;
      const { name, userId } = body;
      return await db.insert(nodes).values({ name, userId });
    };
    const updateNode = async () => {
      const { id } = params;
      const { name, userId } = body;
      const [result] = await db
        .update(nodes)
        .set({ name, userId })
        .where(eq(nodes.id, parseInt(id)))
        .returning({ updatedId: nodes.id });
      return result;
    };
    const deleteNode = async () => {
      const { id } = params;
      const [result] = await db
        .delete(nodes)
        .where(eq(nodes.id, parseInt(id)))
        .returning({ deletedId: nodes.id });
      return result;
    };
    return { getNodes, createNode, updateNode, deleteNode };
  });
