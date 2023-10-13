import { leaves } from "$db/schema";
import { leafModel } from "$models";
import { databaseServices } from "$plugins";
import { Elysia } from "elysia";
import { and, eq } from "drizzle-orm";

export const leafControllers = new Elysia({ name: "leaf@controllers" })
  .use(databaseServices)
  .use(leafModel)
  .guard({ body: "leaf.dto" })
  .derive(({ set, body, query, params, db }) => {
    const getLeaves = async () => await db.select().from(leaves);
    const createLeaf = async () => {
      set.status = 201;
      const { username, password, nodeId } = body;
      const result = await db
        .insert(leaves)
        .values({ username, password, nodeId });
      return result.rowsAffected;
    };
    const updateLeaf = async () => {
      const { id, nodeId } = query;
      const { username, password } = body;
      const [result] = await db
        .update(leaves)
        .set({ username, password })
        .where(
          and(
            eq(leaves.id, parseInt(id as string)),
            eq(leaves.nodeId, parseInt(nodeId as string)),
          ),
        )
        .returning({ updatedId: leaves.id });
      return result;
    };
    const deleteLeaf = async () => {
      const { id } = params;
      const [result] = await db
        .delete(leaves)
        .where(eq(leaves.id, parseInt(id)))
        .returning({ deletedId: leaves.id });
      return result;
    };
    return { getLeaves, createLeaf, updateLeaf, deleteLeaf };
  });
