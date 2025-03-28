import type { z } from "zod";
import type { UserEmailSchema } from "./type";
import type { UserTableInsertSchema, UserTableSelectSchema } from "../../db/schema/user";

type UserTableInsert = z.infer<typeof UserTableInsertSchema>;

type UserTableSelect = z.infer<typeof UserTableSelectSchema>;

type UserEmail = z.infer<typeof UserEmailSchema>;

export interface UserModel {
  insertOne: (insert: UserTableInsert) => Promise<UserTableSelect | undefined>;
  findOneByEmail: (email: UserEmail) => Promise<UserTableSelect | undefined>;
}