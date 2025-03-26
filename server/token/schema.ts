import { TokenTableInsertSchema } from "../../db/schema/token";

export const InsertSchema = TokenTableInsertSchema.pick({
  content: true,
  userID: true,
});

export const ContentSchema = TokenTableInsertSchema.pick({
  content: true,
});