import { UserTableSelectSchema } from "@db/schema/user";

export const UserIDSchema = UserTableSelectSchema.pick({
  id: true,
});