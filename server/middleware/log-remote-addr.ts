import { getConnInfo } from "hono/bun";
import { createMiddleware } from "hono/factory";

export const logRemoteAddress = createMiddleware(async (c, next) => {
  console.log(`Remote address": ${getConnInfo(c).remote.address}`);
  await next();
})