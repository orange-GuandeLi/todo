import { SQL, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { DBInsert, DBSelect, DBUpdate } from "..";

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
export const RefreshTokenDBUShcema = RefreshTokenTableUpdateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userID: true,
  });

export async function insertRefreshToken({ values } : {values: z.infer<typeof RefreshTokenDBISchema>}) {
  return await DBInsert({
    table: RefreshTokenTable,
    values: RefreshTokenDBISchema.parse(values),
  });
}

export async function updateRefreshToken(
  {values, where} :
  {
    values: z.infer<typeof RefreshTokenDBUShcema>,
    where?: (table: typeof RefreshTokenTable) => SQL | undefined,
  }
) {
  return await DBUpdate({
    table: RefreshTokenTable,
    values: RefreshTokenDBUShcema.parse(values),
    where: where,
  });
}

export async function selectRefreshToken({ where } : {where?: (table: typeof RefreshTokenTable) => SQL | undefined}) {
  return await DBSelect({ table: RefreshTokenTable, where });
}
