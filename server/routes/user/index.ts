import { Hono } from "hono";
import { zValidator } from "../../middleware/validator";
import { InsertUserSchema, RefreshTokenSchema, SelectUserSchema, SignInSchema } from "../../types/user";
import { db } from "../../../db";
import { UserTable } from "../../../db/schema/user";
import { and, eq } from "drizzle-orm";
import { SignAccessToken, SignRefreshToken } from "../../util";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "../../types/user/constants";
import { RefreshTokenTable } from "../../../db/schema/refresh-token";
import { Auth } from "../../middleware/auth";
import type { JwtPayload } from "../../types";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

export const user = new Hono<{ Variables: JwtPayload }>()
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
  })
  .delete("/signOut", Auth, async (c) => {
    const err = new HTTPException(401, { message: "Unauthorized" });
    const refreshToken = c.req.header(REFRESH_TOKEN_HEADER);
    if (!refreshToken) {
      throw err;
    }

    try {
      const { userID, groupID } = RefreshTokenSchema.parse(await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!));

      await db
        .update(RefreshTokenTable)
        .set({
          isRevoked: true
        })
        .where(and(
          eq(RefreshTokenTable.userID, userID),
          eq(RefreshTokenTable.groupID, groupID),
        ));
      
      return c.body(null, 204);
    } catch {
      throw err;
    }
  });