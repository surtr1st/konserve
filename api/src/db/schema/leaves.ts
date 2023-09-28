import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { nodes } from "./nodes";

export const leaves = sqliteTable("leaves", {
  id: integer("id").primaryKey(),
  username: text("username"),
  password: text("password"),
  nodeId: integer("node_id").references(() => nodes.id),
});
