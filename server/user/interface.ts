import type { Email, Insert, User } from "./type";

export interface UserModel {
  insert: (insert: Insert) => Promise<User | undefined>;
  findOneByEmail: (email: Email) => Promise<User | undefined>;
}