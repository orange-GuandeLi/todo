import { eq } from "drizzle-orm";
import { db } from "../../db";
import { UserTable } from "../../db/schema/user";
import type { UserModel } from "./interface";
import { EmailSchema, InsertSchema } from "./schema";

function formatUserData(users: typeof UserTable.$inferSelect[]) {
  return users.map(user => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  }))
}

export const userModel: UserModel = {
  insert: async (insert) => {
    return formatUserData(await db.insert(UserTable).values(InsertSchema.parse(insert)).returning())[0]
  },
  findOneByEmail: async (email) => {
    return formatUserData(await db.select().from(UserTable).where(eq(UserTable.email, EmailSchema.parse(email).email)))[0]
  }
}