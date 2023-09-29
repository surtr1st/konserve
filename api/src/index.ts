import { Elysia } from "elysia";
import { auth, node } from "./routes";

const app = new Elysia().use(auth).use(node).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
