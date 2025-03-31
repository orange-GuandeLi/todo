import { Hono } from "hono";
import { RefreshTokenSchema, type JwtPayload } from "./type";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "./constants";
import { Auth } from "./auth-middleware";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import { insertUser, selectUser, insertRefreshToken, updateRefreshToken } from "./model";
import { eq, and } from "drizzle-orm";
import { TypeValidator } from "../../middleware/type-validator";
import { SignAccessToken, SignRefreshToken } from "../../util";
import { SignInRestSchema, SignInRestSSchema, UserRestISchema } from "./api-schema";

export const user = new Hono<{ Variables: JwtPayload }>()
  .post("/", TypeValidator("json", UserRestISchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await Bun.password.hash(insert.password);

    const res = await insertUser(
      {values: insert}
    );

    return c.json(
      res,
      201,
    );
  })
  .post("/signIn", TypeValidator("json", SignInRestSchema), async (c) => {
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
      SignInRestSSchema.parse(user),
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
      
      return c.text("Signout successfully.", 200);
    } catch {
      throw err;
    }
  });