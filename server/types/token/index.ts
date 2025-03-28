import { z } from "zod";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

export const AccessTokenSchema = z.object({
  userID: z.number().int().positive(),
  type: z.literal(ACCESS_TOKEN_KEY),
  exp: z.number().optional(),
  iat: z.number().optional(),
  nbf: z.number().optional(),
});

export const RefreshTokenSchema = z.object({
  userID: z.number().int().positive(),
  tokenID: z.string(),
  groupID: z.string(),
  type: z.literal(REFRESH_TOKEN_KEY),
  exp: z.number().optional(),
  iat: z.number().optional(),
  nbf: z.number().optional(),
});

export type AccessToken = z.infer<typeof AccessTokenSchema>;

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;