import { UserTable, UserTableInsertSchema, UserTableSelectSchema } from "../../db/schema/user";

export const InsertSchema = UserTableInsertSchema.pick({
  email: true,
  password: true,
});

export const EmailSchema = UserTableSelectSchema.pick({
  email: true,
});

export const IDSchema = UserTableSelectSchema.pick({
  id: true,
});