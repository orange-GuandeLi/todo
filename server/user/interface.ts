import type { InsertUser, SelectUser } from "./type";

export interface UserModel {
  insert: (insert: InsertUser) => Promise<SelectUser | undefined>
}