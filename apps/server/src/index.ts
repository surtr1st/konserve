import { Elysia } from "elysia";
import { auth, leaf, node, user } from "./routes";

const app = new Elysia().use(auth).use(user).use(node).use(leaf).listen(3000);

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
