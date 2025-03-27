import type { z } from "zod";
import type { InsertUserSchema, SelectUserSchema } from "./schema";

export type InsertUser = z.infer<typeof InsertUserSchema>;

export type SelectUser = z.infer<typeof SelectUserSchema>;