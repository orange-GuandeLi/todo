import type { ID, Insert, Todo, Update } from "./type";
import type { ID as UserID } from "../user/type";
import type { z } from "zod";
import type { TodoTableInsertSchema, TodoTableUpdateSchema } from "../../db/schema/todo";

export interface TodoModel {
  getAll: () => Promise<Todo[]>;
  insert: (insert: z.infer<typeof TodoTableInsertSchema>) => Promise<Todo | undefined>;
  deleteByID: (d: z.infer<typeof TodoTableUpdateSchema>) => Promise<Todo | undefined>;
  updateByID: (id: ID, update: Update) => Promise<Todo | undefined>;
  findManyByUserID: (id: UserID) => Promise<Todo[]>;
}