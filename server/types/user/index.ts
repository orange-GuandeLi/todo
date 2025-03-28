import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { UserTable } from "../../../db/schema/user";

const UserTableSelectSchema = createSelectSchema(UserTable);
const UserTableInsertSchema = createInsertSchema(UserTable);
const UserTableUpdateSchema = createUpdateSchema(UserTable);

export const InsertUserSchema = UserTableInsertSchema.pick({
  email: true,
  password: true,
});

export const SelectUserSchema = UserTableSelectSchema.omit({
  password: true,
});