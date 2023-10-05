import Elysia from "elysia";
import { users } from "$db/schema";
import { userModel } from "$models";
import { databaseServices, encrypt } from "$plugins";
import { eq } from "drizzle-orm";

export const userControllers = new Elysia({ name: "user@controllers" })
  .use(userModel)
  .use(databaseServices)
  .use(encrypt)
  .guard({ body: "user.dto" })
  .derive(({ set, body, params, db, hash }) => {
    const getUsers = async () => await db.select().from(users);
    const createUser = async () => {
      set.status = 201;
      const { email, username, password, displayName, secretCode } = body;
      const result = await db.insert(users).values({
        email,
        username,
        password: await hash(password as string),
        displayName: displayName || `@${username}`,
        secretCode,
      });
      return result.rowsAffected;
    };
    const updateUser = async () => {
      const { id } = params;
      const [result] = await db
        .update(users)
        .set({ ...body })
        .where(eq(users.uid, id))
        .returning({ updateId: users.uid });
      return result;
    };
    const deleteUser = async () => {
      const { id } = params;
      const [result] = await db
        .delete(users)
        .where(eq(users.uid, id))
        .returning({ deleteId: users.uid });
      return result;
    };
    return { getUsers, createUser, updateUser, deleteUser };
  });
