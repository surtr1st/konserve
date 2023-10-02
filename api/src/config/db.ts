import * as schema from "../db/schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DATABASE_URL, TURSO_AUTH_TOKEN } from "./env";

export function useDrizzle() {
  const client = createClient({
    url: DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  });
  return drizzle(client, { schema });
}
