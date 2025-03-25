import { desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { TodoTable, todoTableInsertSchema, todoTableUpdateSchema } from "../../db/schema/todo";
import type { TodoModel } from "./interface";
import { IDSchema } from "./schema";

function formatTodoData(todos: typeof TodoTable.$inferSelect[]) {
  return todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString()
  }))
}

export const todoModel: TodoModel = {
  getAll: async () => {
    return formatTodoData(await db.select().from(TodoTable).orderBy(desc(TodoTable.updatedAt)));
  },
  insert: async (todo) => {
    return formatTodoData(await db.insert(TodoTable).values(todoTableInsertSchema.parse(todo)).returning())[0];
  },
  deleteByID: async (id) => {
    return formatTodoData(await db.delete(TodoTable).where(eq(TodoTable.id, IDSchema.parse(id).id)).returning())[0];
  },
  updateByID: async (id, todo) => {
    return formatTodoData(await db.update(TodoTable).set(todoTableUpdateSchema.parse(todo)).where(eq(TodoTable.id, IDSchema.parse(id).id)).returning())[0];
  }
}