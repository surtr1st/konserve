import { Database } from "bun:sqlite";

export function createDatabase(name = "") {
  return new Database(name);
}
