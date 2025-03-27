import { UserTableInsertSchema, UserTableSelectSchema } from "@db/schema/user";

export const SelectUserSchema = UserTableSelectSchema.omit({
  password: true,
});

export const InsertUserSchema = UserTableInsertSchema.pick({
  email: true,
  password: true,
});
