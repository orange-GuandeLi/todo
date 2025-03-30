import { hc } from "hono/client";
import { ApiRoute } from "@server/app"
import { HTTPException } from "hono/http-exception";
import { ACCESS_NEW_TOKEN_HEADER, ACCESS_TOKEN_HEADER, REFRESH_NEW_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "@server/routes/user/constants";

export const api = hc<ApiRoute>("/", {
  fetch: async (input, requestInit, _, __) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_HEADER);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_HEADER);

    const config: RequestInit = {
      ...requestInit,
      headers: {
        ...requestInit?.headers,
        "Content-Type": "application/json",
        ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
        ...(refreshToken ? { [REFRESH_TOKEN_HEADER]: refreshToken } : {}),
      }
    }

    const res = await fetch(input, config);
    if (!res.ok && res.status == 401) {
      throw new HTTPException(401, { message: await res.text() });
    }

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const newAccessToken = res.headers.get(ACCESS_NEW_TOKEN_HEADER);
    if (newAccessToken) {
      localStorage.setItem(ACCESS_TOKEN_HEADER, newAccessToken);
    }

    const newRefreshToken = res.headers.get(REFRESH_NEW_TOKEN_HEADER);
    if (newRefreshToken) {
      localStorage.setItem(REFRESH_TOKEN_HEADER, newRefreshToken);
    }

    return res;
  },
}).api;