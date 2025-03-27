import { db } from "@db/index";
import type { TokenModel } from "./interface";
import { TokenTable, TokenTableInsertSchema } from "@db/schema/token";

export const tokenModel: TokenModel = {
  insertOne: async (insert) => {
    return await db
      .insert(TokenTable)
      .values(TokenTableInsertSchema.parse(insert))
      .returning()
      .then(r => r[0]);
  },
}