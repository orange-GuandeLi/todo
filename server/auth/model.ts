import { db } from "@db/index";
import type { TokenModel } from "./interface";
import { TokenTable, TokenTableInsertSchema } from "@db/schema/token";
import { eq } from "drizzle-orm";
import { TokenSchema } from "./schema";

export const tokenModel: TokenModel = {
  insertOne: async (insert) => {
    return await db
      .insert(TokenTable)
      .values(TokenTableInsertSchema.parse(insert))
      .returning()
      .then(r => r[0]);
  },
  findOneByToken: async (token) => {
    return await db
      .select()
      .from(TokenTable)
      .where(eq(TokenTable.token, TokenSchema.parse(token).token))
      .then(r => r[0])
  },
}