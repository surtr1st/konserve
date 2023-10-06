import Elysia from "elysia";
import { userControllers } from "$controllers";
import { userMiddlewares } from "$middlewares";

export const user = new Elysia({ name: "user@routes" })
  .use(userControllers)
  .use(userMiddlewares)
  .get("/users", ({ getUsers }) => getUsers())
  .group("/user", (user) =>
    user
      .post("/register", ({ createUser }) => createUser(), {
        beforeHandle: ({ verifyRequestBody }) => verifyRequestBody(),
      })
      .put("/:id", ({ updateUser }) => updateUser(), {
        beforeHandle: [
          ({ isIntParams }) => isIntParams(),
          ({ verifyRequestBody }) => verifyRequestBody(),
        ],
      })
      .delete("/:id", ({ deleteUser }) => deleteUser(), {
        beforeHandle: ({ isIntParams }) => isIntParams(),
      }),
  );
