import { eq } from "drizzle-orm";
import { db } from "../../db";
import { TodoTable, todoTableInsertSchema, todoTableUpdateSchema } from "../../db/schema/todo";
import type { TodoModel } from "./interface";
import { IDSchema } from "./schema";

export const todoModel: TodoModel = {
  getAll: async () => {
    return await db.select().from(TodoTable);
  },
  insert: async (todo) => {
    return await db.insert(TodoTable).values(todoTableInsertSchema.parse(todo)).returning().then(res => res[0]);
  },
  deleteByID: async (id) => {
    return await db.delete(TodoTable).where(eq(TodoTable.id, IDSchema.parse(id).id)).returning().then(res => res[0]);
  },
  updateByID: async (id, todo) => {
    return await db.update(TodoTable).set(todoTableUpdateSchema.parse(todo)).where(eq(TodoTable.id, IDSchema.parse(id).id)).returning().then(res => res[0]);
  }
}