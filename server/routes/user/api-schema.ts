import { UserDBISchema, UserDBSSchema } from "../../../db/schema/user";

export const UserRestISchema = UserDBISchema;
export const SignInRestSchema = UserDBISchema;
export const SignInRestSSchema = UserDBSSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});