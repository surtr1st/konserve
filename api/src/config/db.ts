import { drizzle } from "drizzle-orm/libsql";
import { createClient, Config } from "@libsql/client";

export function useDrizzle(config: Config) {
  const client = createClient(config);
  return drizzle(client);
}
