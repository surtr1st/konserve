import { Elysia, NotFoundError } from "elysia";
import { and, eq } from "drizzle-orm";
import { users } from "$db/schema";
import { authModel } from "$models";
import { databaseServices, errorHandlers } from "$plugins";
import { authState } from "$states";

export const authMiddlewares = new Elysia({ name: "auth@middlewares" })
  .use(authState)
  .use(authModel)
  .use(databaseServices)
  .use(errorHandlers)
  .guard({ body: "auth" })
  .derive(({ body, db, store }) => {
    const verifyUser = async () => {
      const { username, password } = body;

      const [user] = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.username, username as string),
            eq(users.password, password as string),
          ),
        )
        .limit(1);

      if (!user) {
        throw new NotFoundError("User not found!");
      }

      store.userId = user.uid;
    };
    return { verifyUser };
  });
