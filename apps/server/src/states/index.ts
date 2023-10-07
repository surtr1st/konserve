import { Elysia } from "elysia";

export const authState = new Elysia().state({ userId: 0 });
export const secretCodeState = new Elysia().state({
  verifyCount: 0,
  locked: false,
});
