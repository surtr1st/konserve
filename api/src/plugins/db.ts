import { Elysia } from "elysia";
import { useDrizzle } from "../config";

export const databaseServices = new Elysia({ name: "node@services" }).decorate(
  "db",
  useDrizzle(),
);
