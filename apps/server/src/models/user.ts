import Elysia, { t } from "elysia";

export const User = t.Object({
  id: t.Integer(),
  email: t.String(),
  username: t.String(),
  password: t.String(),
  displayName: t.String(),
  secretCode: t.String(),
});
export const UserDTO = t.Partial(t.Omit(User, ["id"]));
export const userModel = new Elysia({ name: "user@models" }).model({
  "user.entity": User,
  "user.dto": UserDTO,
});
