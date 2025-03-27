import type { z } from "zod";
import { UserTableSelectSchema, type UserTableInsertSchema } from "@db/schema/user";
import type { UserEmailSchema } from "./schema";

type UserTableInsert = z.infer<typeof UserTableInsertSchema>;

type UserTableSelect = z.infer<typeof UserTableSelectSchema>;

type UserEmail = z.infer<typeof UserEmailSchema>;

export interface UserModel {
  insertOne: (insert: UserTableInsert) => Promise<UserTableSelect | undefined>;
  findOneByEmail: (email: UserEmail) => Promise<UserTableSelect | undefined>;
}