import { todoTableInsertSchema, todoTableSelectSchema, todoTableUpdateSchema } from "../../db/schema/todo";

export const insertSchema = todoTableInsertSchema.pick({
  title: true,
  description: true,
  completed: true,
})

export const IDSchema = todoTableSelectSchema.pick({
  id: true
})

export const UpdateSchema = todoTableUpdateSchema.pick({
  title: true,
  description: true,
  completed: true,
})
