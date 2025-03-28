import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user";

export const RefreshTokenTable = sqliteTable("RefreshTokenTable", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  groupID: text("groupID").notNull().unique(),
  lastTokenID: text("lastTokenID").notNull().unique(),
  isRevoked: int("isRevoked", { mode: "boolean" }).notNull().default(false),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id, { onDelete: "cascade" }).notNull()
});
