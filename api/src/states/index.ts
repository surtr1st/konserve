import { Elysia } from "elysia";

export const authState = new Elysia().state({ userId: 0 });
