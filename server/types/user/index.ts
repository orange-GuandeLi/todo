import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { UserTable } from "../../../db/schema/user";
import { RefreshTokenTable } from "../../../db/schema/refresh-token";
import { z } from "zod";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

const UserTableSelectSchema = createSelectSchema(UserTable);
const UserTableInsertSchema = createInsertSchema(UserTable, {
  email: z.string().email(),
});
const UserTableUpdateSchema = createUpdateSchema(UserTable);

const RefreshTokenTableSelectSchema = createSelectSchema(RefreshTokenTable);
const RefreshTokenTableInsertSchema = createInsertSchema(RefreshTokenTable);
const RefreshTokenTableUpdateSchema = createUpdateSchema(RefreshTokenTable);

export const InsertUserSchema = UserTableInsertSchema.pick({
  email: true,
  password: true,
});

export const SelectUserSchema = UserTableSelectSchema.omit({
  password: true,
});

export const SignInSchema = UserTableSelectSchema.pick({
  email: true,
  password: true,
});



// token
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