import { z } from "zod";
import { todoTableInsertSchema } from "../../db/schema/todo";

export const insertSchema = todoTableInsertSchema.pick({
  title: true,
  description: true,
  completed: true,
})
