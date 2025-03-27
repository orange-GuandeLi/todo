import { db } from "@db/index";
import type { UserModel } from "./interface";
import { UserTable } from "@db/schema/user";
import { InsertUserSchema, SelectUserSchema } from "./schema";

export const userModel: UserModel = {
  insert: async (insert) => {
    const res = await db
      .insert(UserTable)
      .values(InsertUserSchema.parse(insert))
      .returning()
      .then(r => r[0])
    
    if (!res) {
      return;
    }

    return SelectUserSchema.parse(res)
  }
}