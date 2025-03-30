import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const RefreshTokenTable = sqliteTable("RefreshTokenTable", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  groupID: text("groupID").notNull().unique(),
  lastTokenID: text("lastTokenID").notNull().unique(),
  isRevoked: int("isRevoked", { mode: "boolean" }).notNull().default(false),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id, { onDelete: "cascade" }).notNull()
});

const RefreshTokenTableSelectSchema = createSelectSchema(RefreshTokenTable);
const RefreshTokenTableInsertSchema = createInsertSchema(RefreshTokenTable, {
  groupID: z.string().uuid(),
  lastTokenID: z.string().uuid(),
});
const RefreshTokenTableUpdateSchema = createUpdateSchema(RefreshTokenTable, {
  groupID: z.string().uuid().optional(),
  lastTokenID: z.string().uuid().optional(),
});

export const RefreshTokenDBSSchema = RefreshTokenTableSelectSchema;
export const RefreshTokenDBISchema = RefreshTokenTableInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export const RefreshTokenDBUSchema = RefreshTokenTableUpdateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userID: true,
  });
