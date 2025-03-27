import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { tokenModel } from "../token/model";
import { verify } from "hono/jwt";

export const Auth = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization")?.split(" ")
  const token = authHeader?.[1] ?? getCookie(c, "token");

  if (!token || authHeader?.[0] != "Bearer") {
    return c.text("Unauthorized", 401)
  }

  const tokenInDB = await tokenModel.findOneByContent({content: token})

  if (!tokenInDB) {
    return c.text("Unauthorized", 401)
  }

  if (tokenInDB.expired) {
    return c.text("Invalid token", 401)
  }

  try {
    const payload = await verify(token, process.env.JWT_SECRET!)
    console.log(payload);
    c.set("jwtPayload", payload);

    await next()
  } catch (err) {
    await tokenModel.updateOneByContent({ content: token }, { expired: true })
    return c.text("Invalid token", 401)
  }
})