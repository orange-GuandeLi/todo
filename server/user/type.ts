import type { z } from "zod";
import type { UserTableSelectSchema } from "../../db/schema/user";
import type { EmailSchema, IDSchema, InsertSchema } from "./schema";

export type User = z.infer<typeof UserTableSelectSchema>;

export type Insert = z.infer<typeof InsertSchema>;

export type Email = z.infer<typeof EmailSchema>;

export type ID = z.infer<typeof IDSchema>;