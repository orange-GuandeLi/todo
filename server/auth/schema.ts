import { TokenTableSelectSchema } from "../../db/schema/token";

export const TokenSchema = TokenTableSelectSchema.pick({
  token: true,
});