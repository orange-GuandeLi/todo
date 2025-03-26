import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { tokenModel } from "../token/model";

export const Auth = createMiddleware(async (c, next) => {
  const token = getCookie(c, "token") || c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
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
    c.set("user", payload)

    await next()
  } catch (err) {
    return c.text("Invalid token", 401)
  }
})