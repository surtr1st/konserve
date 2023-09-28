import { test, expect } from "bun:test";

const DB_NAME = process.env.TURSO_URL;

test("Read database URL from .env", () => {
  expect(DB_NAME).toBeString();
});
