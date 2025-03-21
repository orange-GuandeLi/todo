import type { z } from "zod";
import type { todoTableSelectSchema } from "../../db/schema/todo";
import type { IDSchema, insertSchema, UpdateSchema } from "./schema";

export type Todo = z.infer<typeof todoTableSelectSchema>;

export type Insert = z.infer<typeof insertSchema>;

export type ID = z.infer<typeof IDSchema>;

export type Update = z.infer<typeof UpdateSchema>;