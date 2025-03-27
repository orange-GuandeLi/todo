import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { tokenModel } from "server/auth/model";
import { GetTokenFromContext } from "server/util";

export const Auth = createMiddleware(async (c, next) => {
  const token = GetTokenFromContext(c);
  if (!token) {
    return c.text("Unauthorized", 401)
  }

  const tokenInDB = await tokenModel.findOneByToken({ token })

  if (!tokenInDB) {
    return c.text("Unauthorized", 401)
  }

  try {
    const payload = await verify(token, process.env.JWT_SECRET!)
    c.set("jwtPayload", payload);

    await next()
  } catch (err) {
    return c.text("Invalid token", 401)
  }
})