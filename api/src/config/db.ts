import * as schema from "../db/schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient, Config } from "@libsql/client";

const DB_NAME = process.env.TURSO_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

export function useDrizzle({
  url = DB_NAME as string,
  authToken = TURSO_AUTH_TOKEN,
  ...rest
}: Config) {
  const client = createClient({
    url,
    authToken,
    ...rest,
  });
  return drizzle(client, { schema });
}
