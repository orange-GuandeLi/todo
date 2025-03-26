import type { Content, Insert, Token } from "./type";

export interface TokenModel {
  insert: (insert: Insert) => Promise<Token | undefined>;
  updateOneByContent: (content: Content) => Promise<Token | undefined>;
  findOneByContent: (content: Content) => Promise<Token | undefined>;
}