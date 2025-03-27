import { eq } from "drizzle-orm";
import { db } from "../../db";
import { UserTable, UserTableInsertSchema } from "../../db/schema/user";
import type { UserModel } from "./interface";
import { UserEmailSchema } from "./schema";

export const userModel: UserModel = {
  insertOne: async (insert) => {
    return await db
      .insert(UserTable)
      .values(UserTableInsertSchema.parse(insert))
      .returning()
      .then(r => r[0]);
  },
  findOneByEmail: async (email) => {
    return await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, UserEmailSchema.parse(email).email))
      .then(r => r[0])
  }
}