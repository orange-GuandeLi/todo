import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { jwt, verify } from "hono/jwt";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "./constants";
import { RefreshTokenSchema } from "./types";
import { selectRefreshToken, updateRefreshToken } from "@db/schema/refresh-token";
import { and, eq } from "drizzle-orm";
import { SignAccessToken, SignRefreshToken } from "@server/util";

export function Auth() {
  return createMiddleware(async (c, next) => {
    try {
      await jwt({
        secret: process.env.ACCESS_TOKEN_SECRET!,
      })(c, next);
    } catch (err) {
      if (!(err instanceof HTTPException) || err.status != 401) {
        throw err;
      }

      const jwtError = new HTTPException(401, { message: "Unauthorized" });

      const refreshToken = c.req.header(REFRESH_TOKEN_HEADER);

      if (!refreshToken) {
        throw jwtError;
      }

      try {
        const { userID, groupID, tokenID } = RefreshTokenSchema.parse(
          await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
        );

        const tokenInDB = await selectRefreshToken({
          where: (table) => and(
            eq(table.userID, userID),
            eq(table.groupID, groupID),
            eq(table.lastTokenID, tokenID),
          )
        }).then(r => r[0]);

        if (!tokenInDB) {
          await updateRefreshToken({
            where: (table) => and(
              eq(table.userID, userID),
              eq(table.groupID, groupID),
            ),
            values: {
              isRevoked: true
            },
          });

          throw jwtError;
        }

        if (tokenInDB.isRevoked) {
          throw jwtError;
        }

        const newAccessToken = await SignAccessToken({ userID: userID });
        const newRefreshToken = await SignRefreshToken({ userID: userID, groupID: groupID });
        await updateRefreshToken({
          values: { lastTokenID: newRefreshToken.payload.tokenID },
          where: (table) => and(
            eq(table.userID, userID),
            eq(table.groupID, groupID),
            eq(table.lastTokenID, tokenID),
          ),
        })

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
        throw jwtError;
      }
    }
  })
}