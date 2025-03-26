import { TodoTableInsertSchema, TodoTableSelectSchema, TodoTableUpdateSchema } from "../../db/schema/todo";

export const InsertSchema = TodoTableInsertSchema.pick({
  title: true,
  description: true,
  completed: true,
})

export const IDSchema = TodoTableSelectSchema.pick({
  id: true
})

export const UpdateSchema = TodoTableUpdateSchema.pick({
  title: true,
  description: true,
  completed: true,
})
