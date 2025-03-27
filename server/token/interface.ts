import type { Content, Insert, Token, Update } from "./type";

export interface TokenModel {
  insert: (insert: Insert) => Promise<Token | undefined>;
  updateOneByContent: (content: Content, update: Update) => Promise<Token | undefined>;
  findOneByContent: (content: Content) => Promise<Token | undefined>;
}