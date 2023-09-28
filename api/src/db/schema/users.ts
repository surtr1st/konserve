import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  uid: integer("id").primaryKey(),
  email: text("email"),
  username: text("username"),
  password: text("password"),
  displayName: text("display_name"),
  secretCode: text("secret_code"),
});
