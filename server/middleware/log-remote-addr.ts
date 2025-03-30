import { getConnInfo } from "hono/bun";
import { createMiddleware } from "hono/factory";

export function LogRemoteAddress() {
  return createMiddleware(async (c, next) => {
    console.log(`Remote address": ${getConnInfo(c).remote.address}`);
    await next();
  })
};