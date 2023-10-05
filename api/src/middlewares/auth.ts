import { Elysia, NotFoundError } from "elysia";
import { and, eq } from "drizzle-orm";
import { users } from "$db/schema";
import { authModel } from "$models";
import { databaseServices, encrypt, errorHandlers } from "$plugins";
import { authState } from "$states";

export const authMiddlewares = new Elysia({ name: "auth@middlewares" })
  .use(authState)
  .use(authModel)
  .use(databaseServices)
  .use(encrypt)
  .use(errorHandlers)
  .guard({ body: "auth" })
  .derive(({ body, db, store, hash, isMatch }) => {
    const verifyUser = async () => {
      const { username, password } = body;

      const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.username, username as string)))
        .limit(1);

      if (!user) {
        throw new NotFoundError("User does not exist!");
      }

      const isUserMatch = await isMatch(
        user.password as string,
        await hash(password as string),
      );

      if (!isUserMatch) {
        throw new NotFoundError("Password does not match!");
      }

      store.userId = user.uid;
    };
    return { verifyUser };
  });
