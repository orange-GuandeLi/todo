import type { JWTPayload } from "hono/utils/jwt/types";

export type JwtPayload = JWTPayload & {
  userID: number;
}