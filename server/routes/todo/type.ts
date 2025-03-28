import { TodoTableInsertSchema, TodoTableSelectSchema, TodoTableUpdateSchema } from "../../db/schema/todo";
import { UserTableSelectSchema } from "../../db/schema/user";

export const UserIDSchema = UserTableSelectSchema.pick({
  id: true,
});

export const InsertTodoSchema = TodoTableInsertSchema.pick({
  title: true,
  description: true,
  completed: true,
});

export const UpdateTodoSchema = TodoTableUpdateSchema.pick({
  title: true,
  description: true,
  completed: true,
});

export const TodoIDSchema = TodoTableSelectSchema.pick({
  id: true,
});