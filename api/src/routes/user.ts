import { userControllers } from "$controllers";
import { userMiddlewares } from "$middlewares";
import Elysia from "elysia";

export const user = new Elysia({ name: "user@routes" })
  .use(userControllers)
  .use(userMiddlewares)
  .get("/users", ({ getUsers }) => getUsers())
  .group("/user", (user) =>
    user
      .post("/register", ({ createUser }) => createUser(), {
        beforeHandle: ({ validateBody }) => validateBody(),
      })
      .put("/:id", ({ updateUser }) => updateUser(), {
        beforeHandle: [
          ({ isIntParams }) => isIntParams(),
          ({ validateBody }) => validateBody(),
        ],
      })
      .delete("/:id", ({ deleteUser }) => deleteUser(), {
        beforeHandle: ({ validateBody }) => validateBody(),
      }),
  );
