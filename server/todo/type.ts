import type { z } from "zod";
import type { TodoTableSelectSchema } from "../../db/schema/todo";
import type { IDSchema, InsertSchema, UpdateSchema } from "./schema";

export type Todo = z.infer<typeof TodoTableSelectSchema>;

export type Insert = z.infer<typeof InsertSchema>;

export type ID = z.infer<typeof IDSchema>;

export type Update = z.infer<typeof UpdateSchema>;