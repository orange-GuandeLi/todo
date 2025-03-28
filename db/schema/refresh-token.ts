import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { UserTable } from "./user";

export const RefreshToken = sqliteTable("RefreshToken", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  token: text("token").notNull().unique(),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id, { onDelete: "cascade" }).notNull()
}, (table) => [
  uniqueIndex("tokenIndex").on(table.token)
]);

export const RefreshTokenSelectSchema = createSelectSchema(RefreshToken);
export const RefreshTokenInsertSchema = createInsertSchema(RefreshToken);
export const RefreshTokenUpdateSchema = createUpdateSchema(RefreshToken);