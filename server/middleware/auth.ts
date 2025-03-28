import { createMiddleware } from "hono/factory";
import { jwt, verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { SignAccessToken, SignRefreshToken } from "../util";
import { db } from "../../db";
import { RefreshTokenTable } from "../../db/schema/refresh-token";
import { and, eq } from "drizzle-orm";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "../types/user/constants";
import { RefreshTokenSchema } from "../types/user";

export const Auth = createMiddleware(async (c, next) => {
  try {
    await jwt({
      secret: process.env.ACCESS_TOKEN_SECRET!,
    })(c, next);
  } catch (err) {
    if (err instanceof HTTPException && err.status == 401) {
      const refreshToken = c.req.header(REFRESH_TOKEN_HEADER);

      if (!refreshToken) {
        throw err;
      }

      try {
        const { userID, groupID, tokenID } = RefreshTokenSchema.parse(await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!));

        const tokenInDB = await db
          .select()
          .from(RefreshTokenTable)
          .where(and(
            eq(RefreshTokenTable.userID, userID),
            eq(RefreshTokenTable.groupID, groupID),
            eq(RefreshTokenTable.lastTokenID, tokenID),
          ))
          .then(r => r[0]);

        if (!tokenInDB) {
          try {
            await db
              .update(RefreshTokenTable)
              .set({
                isRevoked: true
              })
              .where(and(
                eq(RefreshTokenTable.userID, userID),
                eq(RefreshTokenTable.groupID, groupID),
              ));
          } catch {
            throw err;
          }

          throw err;
        }

        if (tokenInDB.isRevoked) {
          throw err;
        }

        const newAccessToken = await SignAccessToken({userID: userID});
        const newRefreshToken = await SignRefreshToken({userID: userID, groupID: groupID});
        await db
          .update(RefreshTokenTable)
          .set({lastTokenID: newRefreshToken.payload.tokenID})
          .where(and(
            eq(RefreshTokenTable.userID, userID),
            eq(RefreshTokenTable.groupID, groupID),
            eq(RefreshTokenTable.lastTokenID, tokenID),
          ));

        c.header(
          ACCESS_NEW_TOKEN_HEADER,
          newAccessToken.token,
        );
        c.header(
          REFRESH_NEW_TOKEN_HEADER,
          newRefreshToken.token,
        );

        c.set("jwtPayload", newAccessToken.payload);

        return await next();
      } catch {
        throw err;
      }
    }

    throw err;
  }
})