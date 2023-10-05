import Elysia from "elysia";

export const encrypt = new Elysia({ name: "encrypt@services" }).derive(({}) => {
  const hash = async (password: string) =>
    await Bun.password.hash(password, { algorithm: "bcrypt" });
  const isMatch = async (password: string, encryped: string) =>
    await Bun.password.verify(password, encryped);
  return { hash, isMatch };
});
