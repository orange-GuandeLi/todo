import type { ID, Insert, Todo, Update } from "./type";

export interface TodoModel {
  getAll: () => Promise<Todo[]>;
  insert: (insert: Insert) => Promise<Todo | undefined>;
  deleteByID: (id: ID) => Promise<Todo | undefined>;
  updateByID: (id: ID, update: Update) => Promise<Todo | undefined>;
}