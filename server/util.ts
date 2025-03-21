import type { ZodError } from "zod";

export function FormatZodError(zodError: ZodError) {
  return zodError.issues.map(issue => `[${issue.path.join(", ")}]: ${issue.message}`).join(", ")
}