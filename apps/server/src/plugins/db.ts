import { Elysia } from "elysia";
import { useDrizzle } from "../config";

export const databaseServices = new Elysia({ name: "db@services" }).decorate(
  "db",
  useDrizzle(),
);
