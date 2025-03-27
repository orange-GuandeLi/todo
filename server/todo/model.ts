import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { TodoTable, TodoTableInsertSchema, TodoTableSelectSchema, TodoTableUpdateSchema } from "../../db/schema/todo";
import type { TodoModel } from "./interface";
import { DeleteSchema, IDSchema, UpdateSchema } from "./schema";
import { IDSchema as UserIDSchema } from "../user/schema";

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
    return formatTodoData(await db.insert(TodoTable).values(TodoTableInsertSchema.parse(todo)).returning())[0];
  },
  deleteByID: async (d) => {
    return formatTodoData(await db.delete(TodoTable).where(and(eq(TodoTable.id, DeleteSchema.parse(d).id), eq(TodoTable.userID, DeleteSchema.parse(d).userID))).returning())[0];
  },
  updateByID: async (id, todo) => {
    return formatTodoData(await db.update(TodoTable).set(TodoTableUpdateSchema.parse(todo)).where(eq(TodoTable.id, IDSchema.parse(id).id)).returning())[0];
  },
  findManyByUserID: async (id) => {
    return formatTodoData(await db.select().from(TodoTable).where(eq(TodoTable.userID, UserIDSchema.parse(id).id)).orderBy(desc(TodoTable.updatedAt)));
  }
}