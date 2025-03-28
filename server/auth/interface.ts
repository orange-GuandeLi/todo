import { z } from "zod";
import { RefreshTokenTableSelectSchema, type RefreshTokenTableInsertSchema } from "../../db/schema/refresh-token";

type RefreshTokenTableInsert = z.infer<typeof RefreshTokenTableInsertSchema>;

type RefreshTokenTableSelect = z.infer<typeof RefreshTokenTableSelectSchema>;

export const SelectRefreshTokenIndexSchema = RefreshTokenTableSelectSchema.pick({
  groupID: true,
  userID: true,
  lastTokenID: true,
});

type SelectRefreshTokenIndex = z.infer<typeof SelectRefreshTokenIndexSchema>;

export interface RefreshTokenModel {
  insertOne: (insert: RefreshTokenTableInsert) => Promise<RefreshTokenTableSelect | undefined>;
  findOneByIndex: (index: SelectRefreshTokenIndex) => Promise<RefreshTokenTableSelect | undefined>;
}