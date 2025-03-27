import { db } from "@db/index";
import type { TodoModel } from "./interface";
import { TodoTable, TodoTableInsertSchema, TodoTableUpdateSchema } from "@db/schema/todo";
import { and, desc, eq } from "drizzle-orm";
import { UserIDSchema } from "./schema";

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