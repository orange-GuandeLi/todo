import { Hono } from "hono";
import { zValidator } from "../middleware/validator";
import { InsertSchema } from "./schema";
import type { UserModel } from "./interface";
import { sign } from "hono/jwt";
import { userModel } from "./model";
import { password } from "bun";
import { setCookie } from "hono/cookie";

export const user = (model: UserModel) =>
  new Hono()
  .post("/sign-up", zValidator("json", InsertSchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await password.hash(insert.password)

    const res = await model.insert(insert);
    if (!res) {
      throw new Error("Faild to insert User")
    }

    return c.json(res, 201)
  })
  .post("/sign-in", zValidator("json", InsertSchema), async (c) => {
    const json = c.req.valid("json");
    const user = await userModel.findOneByEmail(json)
    if (!user) {
      throw new Error(`User with email ${ json.email } was not found`);
    }

    if (!await password.verify(json.password, user.password)) {
      throw new Error(`Password not match`)
    }

    const token = await sign({
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    }, process.env.JWT_SECRET!)

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: process.env.ENV == "prod",
      sameSite: "Strict",
      maxAge: 60 * 60,
      path: "/",
      signingSecret: process.env.JWT_SECRET
    })

    return c.json({
      user,
    }, 200)
  })