import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from "zod";
import { UserTable } from "./user";

export const TodoTable = sqliteTable("TodoTabel", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  title: text("title").notNull(),
  description: text("description"),
  completed: int("completed", {mode: "boolean"}).notNull().default(false),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id)
});

export const TodoTableSelectSchema = createSelectSchema(TodoTable, {
  id: z.coerce.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export const TodoTableInsertSchema = createInsertSchema(TodoTable);
export const TodoTableUpdateSchema = createUpdateSchema(TodoTable, {
  userID: z.number().int().positive(),
  id: z.number().int().positive(),
});