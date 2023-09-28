import { test, expect } from "bun:test";
import { createDatabase } from "../src/config";

const DB_NAME = process.env.TURSO_URL;

test("Read database URL from .env", () => {
  expect(DB_NAME).toBeString();
});

test("`Hello World` message from database", () => {
  const db = createDatabase(DB_NAME);
  const query = db.query(`select "Hello World" as message`);
  expect(query.get()).toBe("Hello World");
  db.close();
});
