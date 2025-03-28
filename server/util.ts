import type { ZodError } from "zod";
import { sign } from "hono/jwt";
import type { AccessToken, RefreshToken } from "./types/user";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./types/user/constants";

export function FormatZodError(zodError: ZodError) {
  return zodError.issues.map(issue => `[${issue.path.join(", ")}]: ${issue.message}`).join(", ")
}

export async function SignAccessToken({ userID }: { userID: number }) {
  const payload: AccessToken = {
    userID: userID,
    type: ACCESS_TOKEN_KEY,
    exp: Date.now() / 1000 + 1 * 60,
  }

  return {
    token: await sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET!,
    ),
    payload,
  };
}

export async function SignRefreshToken({ userID, groupID }: { userID: number, groupID?: string }) {
  const payload: RefreshToken = {
    userID: userID,
    groupID: groupID || crypto.randomUUID(),
    tokenID: crypto.randomUUID(),
    type: REFRESH_TOKEN_KEY,
    exp: Date.now() / 1000 + 7 * 24 * 60 * 60,
  }

  return {
    token: await sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!
    ),
    payload,
  };
}
