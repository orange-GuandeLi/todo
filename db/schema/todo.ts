import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user";

export const TodoTable = sqliteTable("TodoTabel", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  title: text("title").notNull(),
  description: text("description"),
  completed: int("completed", {mode: "boolean"}).notNull().default(false),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id, { onDelete: "cascade" }).notNull()
});
