import { Hono } from "hono";
import { sign } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import { UserTableSelectSchema } from "../../db/schema/user";
import type { UserModel } from "../user/interface";
import { zValidator } from "../middleware/validator";
import { SignAccessToken, SignRefreshToken } from "../util";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER } from "../constant";
import { refreshTokenModel } from "./model";

const SignInSchema = UserTableSelectSchema.pick({
  email: true,
  password: true,
});

export const auth = (userModel: UserModel) => new Hono()
  .post("/signIn", zValidator("json", SignInSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await userModel.findOneByEmail({ email });
    if (!user) {
      throw new Error(`User with email ${ email } was not found`);
    }

    if (!await Bun.password.verify(password, user.password)) {
      throw new Error(`Password not match`);
    }

    const newAccessToken = await SignAccessToken({userID: user.id});
    const newRefreshToken = await SignRefreshToken({userID: user.id});

    c.header(
      ACCESS_NEW_TOKEN_HEADER,
      newAccessToken.token,
    );
    
    c.header(
      REFRESH_NEW_TOKEN_HEADER,
      newRefreshToken.token,
    );

    const { payload: { userID, groupID, tokenID } } = newRefreshToken;
    const res = await refreshTokenModel.insertOne({
      userID,
      groupID,
      lastTokenID: tokenID,
    });
    if (!res) {
      throw new Error("Faild to insert refresh token");
    }

    return c.json(
      UserTableSelectSchema.omit({
        password: true
      }).parse(user),
      200);
  });