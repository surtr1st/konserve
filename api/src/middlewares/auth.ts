import { Elysia, NotFoundError } from "elysia";
import { and, eq } from "drizzle-orm";
import { users } from "$db/schema";
import { authModel } from "$models";
import { databaseServices } from "$plugins";
import { authState } from "$states";

export const authMiddlewares = new Elysia({ name: "auth@middlewares" })
  .use(authState)
  .use(authModel)
  .use(databaseServices)
  .guard({ body: "auth" })
  .derive(({ set, body, db, store }) => {
    const validateUser = async () => {
      const { username, password } = body;

      if (!username || username.length === 0) {
        set.status = 404;
        throw new NotFoundError("Username is empty!");
      }
      if (!password || password.length === 0) {
        set.status = 404;
        throw new NotFoundError("Password is empty!");
      }

      const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.username, username), eq(users.password, password)))
        .limit(1);

      if (!user) {
        set.status = 404;
        throw new NotFoundError("User not found!");
      }

      store.userId = user.uid;
    };
    return { validateUser };
  });
