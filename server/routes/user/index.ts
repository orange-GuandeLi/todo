import { Hono } from "hono";
import { zValidator } from "../../middleware/validator";
import { InsertUserSchema, SelectUserSchema, SignInSchema } from "../../types/user";
import { db } from "../../../db";
import { UserTable } from "../../../db/schema/user";
import { eq } from "drizzle-orm";
import { SignAccessToken, SignRefreshToken } from "../../util";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER } from "../../types/user/constants";
import { RefreshTokenTable } from "../../../db/schema/refresh-token";

export const user = new Hono()
  .post("/", zValidator("json", InsertUserSchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await Bun.password.hash(insert.password);

    const res = await db
      .insert(UserTable)
      .values(insert)
      .returning()
      .then(r => r[0]);

    if (!res) {
      throw new Error("Faild to insert User");
    }

    return c.json(
      SelectUserSchema.parse(res),
      201,
    );
  })
  .post("/signIn", zValidator("json", SignInSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email))
      .then(r => r[0])
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
    const res = await db
      .insert(RefreshTokenTable)
      .values({
        userID,
        groupID,
        lastTokenID: tokenID,
      })
      .returning()
      .then(r => r[0]);
    if (!res) {
      throw new Error("Faild to insert refresh token");
    }

    return c.json(
      SelectUserSchema.parse(user),
      200,
    );
  });