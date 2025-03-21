import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';

export const TodoTable = sqliteTable("Todo", {
  id: int("id").primaryKey({autoIncrement: true}),
  title: text("title").notNull(),
  description: text("description"),
  completed: int("completed", {mode: "boolean"}).notNull().default(false),
  createdAt: int("created_at", {mode: "timestamp"}).notNull().default(new Date()),
  updatedAt: int("updated_at", {mode: "timestamp"}).notNull().default(new Date()).$onUpdate(() => new Date()),
});

export const todoTableSelectSchema = createSelectSchema(TodoTable);
export const todoTableInsertSchema = createInsertSchema(TodoTable);
export const todoTableUpdateSchema = createUpdateSchema(TodoTable);