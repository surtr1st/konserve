import { Elysia } from "elysia";
import { useDrizzle } from "../config";

export const services = new Elysia({ name: "node@services" }).decorate(
  "db",
  useDrizzle(),
);
