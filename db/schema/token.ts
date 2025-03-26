import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from "zod";
import { UserTable } from "./user";

export const TokenTable = sqliteTable("TokenTable", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  content: text("content").notNull().unique(),
  expired: int("expired", {mode: "boolean"}).notNull().default(false),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id).notNull()
}, (table) => [
  uniqueIndex("contentIndex").on(table.content)
]);

export const TokenTableSelectSchema = createSelectSchema(TokenTable);
export const TokenTableInsertSchema = createInsertSchema(TokenTable);
export const TokenTableUpdateSchema = createUpdateSchema(TokenTable);