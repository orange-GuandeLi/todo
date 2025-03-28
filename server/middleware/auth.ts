import { createMiddleware } from "hono/factory";
import { jwt, sign, verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { ACCESS_NEW_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER, REFRESH_TOKEN_KEY } from "../constant";
import { RefreshTokenSchema, type RefreshToken } from "../type";
import { SignAccessToken, SignRefreshToken } from "../util";
import { refreshTokenModel } from "../auth/model";

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

        const tokenInDB = await refreshTokenModel.findOneByIndex({
          userID: userID,
          groupID: groupID,
          lastTokenID: tokenID,
        });

        if (!tokenInDB) {
          // 意味着有人模仿攻击

          throw err;
        }

        if (tokenInDB.isRevoked) {
          throw err;
        }

        const newAccessToken = await SignAccessToken({userID: userID});
        c.header(
          ACCESS_NEW_TOKEN_HEADER,
          newAccessToken.token,
        );

        const newRefreshToken = await SignRefreshToken({userID: userID, groupID: groupID}) 
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