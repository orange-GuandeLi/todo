import type { TodoModel } from "./interface";
import { and, desc, eq } from "drizzle-orm";
import { UserIDSchema } from "./schema";
import { TodoTable, TodoTableInsertSchema, TodoTableUpdateSchema } from "../../db/schema/todo";
import { db } from "../../db";

export const todoModel: TodoModel = {
  findManyByUser: async (userID) => {
    return await db
      .select()
      .from(TodoTable)
      .where(eq(TodoTable.userID, UserIDSchema.parse(userID).id))
      .orderBy(desc(TodoTable.updatedAt));
  },
  insertOne: async (insert) => {
    return await db
      .insert(TodoTable)
      .values(TodoTableInsertSchema.parse(insert))
      .returning()
      .then(r => r[0]);
  },
  updateOneByID: async (update) => {
    return await db
      .update(TodoTable)
      .set(TodoTableUpdateSchema.parse(update))
      .where(and(eq(TodoTable.id, update.id), eq(TodoTable.userID, update.userID)))
      .returning()
      .then(r => r[0]);
  }
}