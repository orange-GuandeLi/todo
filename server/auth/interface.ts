import { z } from "zod"
import type { TokenSchema } from "./schema";
import type { TokenTableInsertSchema, TokenTableSelectSchema } from "../../db/schema/token";

type TokenTableInsert = z.infer<typeof TokenTableInsertSchema>;

type TokenTableSelect = z.infer<typeof TokenTableSelectSchema>;

type Token = z.infer<typeof TokenSchema>;

export interface TokenModel {
  insertOne: (insert: TokenTableInsert) => Promise<TokenTableSelect | undefined>;
  findOneByToken: (token: Token) => Promise<TokenTableSelect | undefined>;
  deleteOneByToken: (token: Token) => Promise<TokenTableSelect | undefined>;
}