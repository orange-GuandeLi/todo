import type { TokenTableInsertSchema, TokenTableSelectSchema } from "@db/schema/token"
import type { z } from "zod"

type TokenTableInsert = z.infer<typeof TokenTableInsertSchema>;

type TokenTableSelect = z.infer<typeof TokenTableSelectSchema>;

export interface TokenModel {
  insertOne: (insert: TokenTableInsert) => Promise<TokenTableSelect | undefined>
}