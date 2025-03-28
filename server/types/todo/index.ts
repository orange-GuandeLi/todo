import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { TodoTable } from "../../../db/schema/todo";
import { z } from "zod";

const TodoTableSelectSchema = createSelectSchema(TodoTable, {
  id: z.coerce.number().int().positive(),
});
const TodoTableInsertSchema = createInsertSchema(TodoTable, {
  title: z.string().min(1),
});
const TodoTableUpdateSchema = createUpdateSchema(TodoTable, {
  title: z.string().min(1).optional(),
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

export const SelectTodoIDSchema = TodoTableSelectSchema.pick({
  id: true,
})