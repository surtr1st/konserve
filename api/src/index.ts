import { Elysia } from "elysia";
import { auth, leaf, node } from "$routes";

const app = new Elysia().use(auth).use(node).use(leaf).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
