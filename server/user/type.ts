import { UserTableSelectSchema } from "../../db/schema/user";

export const UserEmailSchema = UserTableSelectSchema.pick({
  email: true
});