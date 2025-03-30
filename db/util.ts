import type { SQLiteTable, SQLiteInsertValue, SQLiteUpdateSetSource } from "drizzle-orm/sqlite-core";
import type { SQL } from "drizzle-orm";
import { db } from "db";

export async function DBSelect<T extends SQLiteTable>(
  { table, where } :
  { table: T, where?: (table: T) => SQL | undefined }
): Promise<T["$inferSelect"][]> {
  const res = await db
    .select()
    .from(table)
    .where(where && where(table));
  
  return res;
}

export async function DBInsert<T extends SQLiteTable, V extends SQLiteInsertValue<T>>(
  { table, values } :
  { table: T, values: V }
): Promise<T["$inferSelect"]> {
  const res = await db
    .insert(table)
    .values(values)
    .returning()
    .then(r => r[0]);
  if (!res) {
    throw new Error("Faild to insert Todo");
  }
  return res;
}

export async function DBUpdate<T extends SQLiteTable, V extends SQLiteUpdateSetSource<T>>(
  { table, values, where } :
  { table: T, values: V, where?: (table: T) => SQL | undefined }
): Promise<T["$inferSelect"]> {
  const res = await db
    .update(table)
    .set(values)
    .where(where && where(table))
    .returning()
    .then(r => r[0]);
  if (!res) {
    throw new Error("Faild to update Todo");
  }
  return res;
}
