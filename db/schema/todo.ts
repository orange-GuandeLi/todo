import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from "zod";

export const TodoTable = sqliteTable("Todo", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  title: text("title").notNull(),
  description: text("description"),
  completed: int("completed", {mode: "boolean"}).notNull().default(false),
  createdAt: int("created_at", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updated_at", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
});

export const todoTableSelectSchema = createSelectSchema(TodoTable, {
  id: z.coerce.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export const todoTableInsertSchema = createInsertSchema(TodoTable);
export const todoTableUpdateSchema = createUpdateSchema(TodoTable);