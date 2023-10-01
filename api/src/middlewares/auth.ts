import { Elysia } from "elysia";
import { and, eq } from "drizzle-orm";
import { users } from "../db/schema";
import { guardAuth } from "../models";
import { databaseServices } from "../plugins";

export const authMiddlewares = new Elysia({ name: "auth@middlewares" })
  .use(guardAuth)
  .use(databaseServices)
  .derive(({ set, body, db, store }) => {
    const validateUser = async () => {
      const { username, password } = body;

      const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.username, username), eq(users.password, password)))
        .limit(1);
      store.userId = user.uid;

      if (!user) {
        set.status = 404;
        return "User not found!";
      }
    };
    return { validateUser };
  });
