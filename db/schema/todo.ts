import { SQL, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "node_modules/zod/lib";
import { DBInsert, DBSelect, DBUpdate } from "..";

export const TodoTable = sqliteTable("TodoTabel", {
  id: int("id").primaryKey({autoIncrement: true}).unique(),
  title: text("title").notNull(),
  description: text("description"),
  completed: int("completed", {mode: "boolean"}).notNull().default(false),
  createdAt: int("createdAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date()),
  userID: int("userID").references(() => UserTable.id, { onDelete: "cascade" }).notNull(),
});

const TodoTableSelectSchema = createSelectSchema(TodoTable, {
  id: z.coerce.number().int().positive(),
});
const TodoTableInsertSchema = createInsertSchema(TodoTable, {
  title: z.string().min(1),
  description: z.string().min(1).optional(),
});
const TodoTableUpdateSchema = createUpdateSchema(TodoTable, {
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export const TodoDBSSchema = TodoTableSelectSchema;
export const TodoDBISchema = TodoTableInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export const TodoDBUShcema = TodoTableUpdateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userID: true,
  });

export async function insertTodo({ values } : {values: z.infer<typeof TodoDBISchema>}) {
  return await DBInsert({
    table: TodoTable,
    values: TodoDBISchema.parse(values),
  });
}

export async function updateTodo(
  {values, where} :
  {
    values: z.infer<typeof TodoDBUShcema>,
    where?: (table: typeof TodoTable) => SQL | undefined,
  }
) {
  return await DBUpdate({
    table: TodoTable,
    values: TodoDBUShcema.parse(values),
    where: where,
  });
}

export async function selectTodo({ where } : {where?: (table: typeof TodoTable) => SQL | undefined}) {
  return await DBSelect({ table: TodoTable, where });
}