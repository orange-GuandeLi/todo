import type { z } from "zod";
import type { TokenTableSelectSchema } from "../../db/schema/token";
import type { ContentSchema, InsertSchema, UpdateSchema } from "./schema";

export type Token = z.infer<typeof TokenTableSelectSchema>;

export type Insert = z.infer<typeof InsertSchema>;

export type Content = z.infer<typeof ContentSchema>;

export type Update = z.infer<typeof UpdateSchema>;