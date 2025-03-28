import type { z } from "zod"
import type { UserIDSchema } from "./type";
import type { TodoTableSelectSchema, TodoTableInsertSchema, TodoTableUpdateSchema } from "../../db/schema/todo";

type TodoTableSelect = z.infer<typeof TodoTableSelectSchema>;

type TodoTableInsert = z.infer<typeof TodoTableInsertSchema>;

type TodoTabelUpdate = z.infer<typeof TodoTableUpdateSchema>;

type UserID = z.infer<typeof UserIDSchema>;

export interface TodoModel {
  findManyByUser: (userID: UserID) => Promise<TodoTableSelect[]>;
  insertOne: (insert: TodoTableInsert) => Promise<TodoTableSelect | undefined>;
  updateOneByID: (update: TodoTabelUpdate) => Promise<TodoTableSelect | undefined>;
}