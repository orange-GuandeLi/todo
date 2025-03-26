import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from "zod";

export const UserTable = sqliteTable("UserTable",
  {
    id: int("id").primaryKey({ autoIncrement: true }).unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
    updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("emailIndex").on(table.email)
  ]
);

export const UserTableSelectSchema = createSelectSchema(UserTable, {
  id: z.coerce.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export const UserTableInsertSchema = createInsertSchema(UserTable, {
  email: z.string().email(),
  password: z.string().min(8)
});
export const UserTableUpdateSchema = createUpdateSchema(UserTable);