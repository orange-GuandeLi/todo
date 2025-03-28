import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { RefreshTokenTable, RefreshTokenTableInsertSchema } from "../../db/schema/refresh-token";
import { SelectRefreshTokenIndexSchema, type RefreshTokenModel } from "./interface";

export const refreshTokenModel: RefreshTokenModel = {
  insertOne: async (insert) => {
    return await db
      .insert(RefreshTokenTable)
      .values(RefreshTokenTableInsertSchema.parse(insert))
      .returning()
      .then(r => r[0]);
  },
  findOneByIndex: async (index) => {
    const { userID, groupID, lastTokenID } = SelectRefreshTokenIndexSchema.parse(index);
    return await db
      .select()
      .from(RefreshTokenTable)
      .where(and(
        eq(RefreshTokenTable.userID, userID),
        eq(RefreshTokenTable.groupID, groupID),
        eq(RefreshTokenTable.lastTokenID, lastTokenID),
      ))
      .then(r => r[0]);
  }
}