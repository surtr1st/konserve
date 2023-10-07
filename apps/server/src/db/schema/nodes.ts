import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const nodes = sqliteTable("nodes", {
  id: integer("id").primaryKey(),
  name: text("name"),
  userId: integer("uid").references(() => users.uid),
});
