import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import type { ZodError } from "zod";

export function FormatZodError(zodError: ZodError) {
  return zodError.issues.map(issue => `[${issue.path.join(", ")}]: ${issue.message}`).join(", ")
}

export function GetTokenFromContext(c: Context) {
  const token = getCookie(c, "token");
  if (token) {
    return token;
  }

  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return;
  }
  const authHeaderSplits = authHeader.split(" ");
  if (authHeaderSplits[0] != "Bearer") {
    return;
  }

  return authHeaderSplits[1];
}