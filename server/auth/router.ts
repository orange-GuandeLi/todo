import { UserTableSelectSchema } from "@db/schema/user";
import { zValidator } from "@middleware/validator";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import type { CookieOptions } from "hono/utils/cookie";
import type { JWTPayload } from "hono/utils/jwt/types";
import type { JwtPayload } from "server/type";
import type { UserModel } from "server/user/interface";
import type { TokenModel } from "./interface";
import { GetTokenFromContext } from "server/util";
import { HTTPException } from "hono/http-exception";

const SignInSchema = UserTableSelectSchema.pick({
  email: true,
  password: true,
})

const cookipOption: CookieOptions = {
  httpOnly: true,
  secure: process.env.ENV == "prod",
  sameSite: "Strict",
  maxAge: 60 * 60,
  path: "/",
  signingSecret: process.env.JWT_SECRET,
}

export const auth = (userModel: UserModel, tokenModel: TokenModel) => new Hono()
  .post("/signIn", zValidator("json", SignInSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await userModel.findOneByEmail({ email });
    if (!user) {
      throw new Error(`User with email ${ email } was not found`);
    }

    if (!await Bun.password.verify(password, user.password)) {
      throw new Error(`Password not match`)
    }

    const jwtPayload: JwtPayload = {
      userID: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    }
    const token = await sign(jwtPayload as JWTPayload, process.env.JWT_SECRET!)

    const insertTokenRes = await tokenModel.insertOne({token, userID: user.id})
    if (!insertTokenRes) {
      throw new Error("Faild to insert Token")
    }

    setCookie(c, "token", token, cookipOption)

    return c.json(
      UserTableSelectSchema.omit({
        password: true
      }).parse(user),
      200);
  })
  .delete("/signOut", async (c) => {
    const token = GetTokenFromContext(c);
    if (!token) {
      throw new HTTPException(401, {
        message: "Unauthorized"
      });
    }

    const res = await tokenModel.deleteOneByToken({ token });
    if (!res) {
      throw new Error("Faild to delete Token");
    }

    setCookie(c, "token", "", cookipOption);

    return c.body(null, 204)
  });