import { TokenTableSelectSchema, type TokenTableInsertSchema } from "@db/schema/token"
import { z } from "zod"
import type { TokenSchema } from "./schema";

type TokenTableInsert = z.infer<typeof TokenTableInsertSchema>;

type TokenTableSelect = z.infer<typeof TokenTableSelectSchema>;

type Token = z.infer<typeof TokenSchema>;

export interface TokenModel {
  insertOne: (insert: TokenTableInsert) => Promise<TokenTableSelect | undefined>;
  findOneByToken: (token: Token) => Promise<TokenTableSelect | undefined>;
  deleteOneByToken: (token: Token) => Promise<TokenTableSelect | undefined>;
}