import { Database } from "bun:sqlite";

export function createDatabase(name = ":memory:") {
  return new Database(name);
}
