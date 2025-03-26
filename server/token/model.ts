import { eq } from "drizzle-orm";
import { db } from "../../db";
import { TokenTable, TokenTableUpdateSchema } from "../../db/schema/token";
import type { TokenModel } from "./interface";
import { ContentSchema, InsertSchema } from "./schema";

export const tokenModel: TokenModel = {
  insert: async (insert) => {
    return await db.insert(TokenTable).values(InsertSchema.parse(insert)).returning().then(r => r[0])
  },
  updateOneByContent: async (content) => {
    return await db.update(TokenTable).set(TokenTableUpdateSchema.parse({
      expired: true
    })).where(eq(TokenTable.content, ContentSchema.parse(content).content)).returning().then(r => r[0])
  },
  findOneByContent: async (cotnent) => {
    return await db.select().from(TokenTable).where(eq(TokenTable.content,ContentSchema.parse(cotnent).content)).then(r => r[0])
  }
}