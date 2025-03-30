import { SQL, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const UserTable = sqliteTable("UserTable",
  {
    id: int("id").primaryKey({ autoIncrement: true }).unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
    updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  });

const UserTableSelectSchema = createSelectSchema(UserTable);
const UserTableInsertSchema = createInsertSchema(UserTable, {
  email: z.string().email(),
  password: z.string().min(1),
});
const UserTableUpdateSchema = createUpdateSchema(UserTable, {
  email: z.string().email().optional(),
  password: z.string().min(1).optional(),
});

export const UserDBSSchema = UserTableSelectSchema;
export const UserDBISchema = UserTableInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export const UserDBUSchema = UserTableUpdateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
