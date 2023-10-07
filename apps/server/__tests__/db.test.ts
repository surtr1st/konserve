import { test, expect } from "bun:test";
import { useDrizzle } from "../src/config";

const DB_NAME = process.env.TURSO_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

test("Read database URL from .env", () => {
  expect(DB_NAME).toBeString();
});

test("Read Turso's auth token from .env", () => {
  expect(TURSO_AUTH_TOKEN).toBeString();
});

test("Select first user in table from drizzle", async () => {
  const db = useDrizzle();
  const result = await db.query.users.findFirst();
  expect(result).toEqual({
    uid: 1,
    email: "test@1",
    username: "test@uname",
    password: "test@pwd",
    displayName: "@test",
    secretCode: "@test@",
  });
});
