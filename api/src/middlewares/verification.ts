import { users } from "$db/schema";
import { cryptoServices, databaseServices } from "$plugins";
import { eq } from "drizzle-orm";
import Elysia, { NotFoundError } from "elysia";

export const verification = new Elysia({
  name: "verification@middlewares",
})
  .use(databaseServices)
  .use(cryptoServices)
  .state({
    verifyCount: 0,
    locked: false,
  })
  .derive(({ db, isMatch, store }) => {
    const verifySecretCode = async (userId: number, secret: string) => {
      const [user] = await db
        .select({ secretCode: users.secretCode })
        .from(users)
        .where(eq(users.uid, userId))
        .limit(1);
      const isSecretMatch = await isMatch(secret, user.secretCode as string);
      if (!store.locked) {
        if (!isSecretMatch) {
          store.verifyCount += 1;
          throw new NotFoundError("Incorrect secret code!");
        }
        if (store.verifyCount > 3) {
          store.locked = true;
          throw new Error(
            "You've been locked for 10 minutes due to incorrect secret code verification over 3 times!",
          );
        }
      }
    };
    return { verifySecretCode };
  });
