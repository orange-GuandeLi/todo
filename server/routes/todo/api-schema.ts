import { TodoDBISchema, TodoDBSSchema, TodoDBUSchema } from "db/schema/todo";

export const TodoRestSSchema = TodoDBSSchema;
export const TodoRestISchema = TodoDBISchema.omit({
  userID: true,
});
export const TodoRestUSchema = TodoDBUSchema;
export const TodoRestIDSSchema = TodoDBSSchema.pick({
  id: true,
});
