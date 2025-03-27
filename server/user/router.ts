import type { CookieOptions } from "hono/utils/cookie";
import type { UserModel } from "./interface";
import { Hono } from "hono";
import { zValidator } from "@middleware/validator";
import { InsertUserSchema } from "./schema";
import { password } from "bun";


const cookipOption: CookieOptions = {
  httpOnly: true,
  secure: process.env.ENV == "prod",
  sameSite: "Strict",
  maxAge: 60 * 60,
  path: "/",
  signingSecret: process.env.JWT_SECRET,
}

export const user = (model: UserModel) => new Hono()
  .post("/", zValidator("json", InsertUserSchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await password.hash(insert.password);

    const res = await model.insert(insert);
    if (!res) {
      throw new Error("Faild to insert User")
    }

    return c.json(res, 201)
  })
  // .post("/sign-up", zValidator("json", InsertSchema), async (c) => {
  //   const insert = c.req.valid("json");
  //   insert.password = await password.hash(insert.password)

  //   const res = await model.insert(insert);
  //   if (!res) {
  //     throw new Error("Faild to insert User")
  //   }

  //   return c.json(res, 201)
  // })
  // .post("/sign-in", zValidator("json", InsertSchema), async (c) => {
  //   const json = c.req.valid("json");
  //   const user = await userModel.findOneByEmail(json)
  //   if (!user) {
  //     throw new Error(`User with email ${ json.email } was not found`);
  //   }

  //   if (!await password.verify(json.password, user.password)) {
  //     throw new Error(`Password not match`)
  //   }

  //   const jwtPayload: JwtPayload = {
  //     userID: user.id,
  //     exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  //   }
  //   const token = await sign(jwtPayload as JWTPayload, process.env.JWT_SECRET!)

  //   const insertTokenRes = await tokenModel.insert({content: token, userID: user.id})
  //   if (!insertTokenRes) {
  //     throw new Error("Faild to insert Token")
  //   }

  //   setCookie(c, "token", token, cookipOption)

  //   return c.json({
  //     user,
  //   }, 200)
  // })
  // .put("/sign-out", Auth, (c) => {
  //   const token = getCookie(c, "token");
    
  //   tokenModel.updateOneByContent({content: token!}, { expired: true });

  //   setCookie(c, "token", "", cookipOption);

  //   return c.body(null, 204);
  // })