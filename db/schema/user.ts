import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const UserTable = sqliteTable("UserTable",
  {
    id: int("id").primaryKey({ autoIncrement: true }).unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
    updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  });
