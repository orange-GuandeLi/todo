import { TokenTableSelectSchema } from "../../db/schema/refresh-token";

export const TokenSchema = TokenTableSelectSchema.pick({
  token: true,
});