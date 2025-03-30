import type { ZodSchema } from "zod";
import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { FormatZodError } from "../util";

export function TypeValidator
  <T extends ZodSchema, Target extends keyof ValidationTargets>
  (target: Target, schema: T) { 
    return zv(target, schema, (res, c) => {
        if (!res.success) {
          return c.text(FormatZodError(res.error), 400);
        }
      }
    );
  }