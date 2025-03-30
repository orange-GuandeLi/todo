import { Hono } from "hono";
import { RefreshTokenSchema, type JwtPayload } from "./types";
import { TypeValidator } from "@server/middleware/type-validator";
import { insertUser, selectUser, UserDBISchema, UserDBSSchema } from "@db/schema/user";
import { and, eq } from "drizzle-orm";
import { SignAccessToken, SignRefreshToken } from "@server/util";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "./constants";
import { insertRefreshToken, updateRefreshToken } from "@db/schema/refresh-token";
import { Auth } from "./auth-middleware";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

export const user = new Hono<{ Variables: JwtPayload }>()
  .post("/", TypeValidator("json", UserDBISchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await Bun.password.hash(insert.password);

    const res = await insertUser(
      {values: insert}
    );

    return c.json(
      UserDBSSchema.omit({ password: true }).parse(res),
      201,
    );
  })
  .post("/signIn", TypeValidator("json", UserDBISchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await selectUser({
      where: (table) => eq(table.email, email),
    }).then(r => r[0]);
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
    await insertRefreshToken({
      values: {
        userID,
        groupID,
        lastTokenID: tokenID,
      }
    });

    return c.json(
      UserDBSSchema.omit({ password: true }).parse(user),
      200,
    );
  })
  .delete("/signOut", Auth(), async (c) => {
    const err = new HTTPException(401, { message: "Unauthorized" });
    const refreshToken = c.req.header(REFRESH_TOKEN_HEADER);
    if (!refreshToken) {
      throw err;
    }

    try {
      const { userID, groupID } = RefreshTokenSchema.parse(await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!));

      await updateRefreshToken({
        values: {
          isRevoked: true
        },
        where: (table) => and(
          eq(table.userID, userID),
          eq(table.groupID, groupID),
        ),
      });

      c.header(
        ACCESS_NEW_TOKEN_HEADER,
        "",
      );
      
      c.header(
        REFRESH_NEW_TOKEN_HEADER,
        "",
      );
      
      return c.body(null, 204);
    } catch {
      throw err;
    }
  });