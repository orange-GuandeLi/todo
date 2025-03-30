import { TodoDBISchema, TodoTable, TodoDBUSchema } from "db/schema/todo";
import { DBInsert, DBUpdate, DBSelect } from "db/util";
import type { SQL } from "drizzle-orm";
import type { z } from "zod";

export async function insertTodo({ values } : {values: z.infer<typeof TodoDBISchema>}) {
  return await DBInsert({
    table: TodoTable,
    values: TodoDBISchema.parse(values),
  });
}

export async function updateTodo(
  {values, where} :
  {
    values: z.infer<typeof TodoDBUSchema>,
    where?: (table: typeof TodoTable) => SQL | undefined,
  }
) {
  return await DBUpdate({
    table: TodoTable,
    values: TodoDBUSchema.parse(values),
    where: where,
  });
}

export async function selectTodo({ where } : {where?: (table: typeof TodoTable) => SQL | undefined}) {
  return await DBSelect({ table: TodoTable, where });
}