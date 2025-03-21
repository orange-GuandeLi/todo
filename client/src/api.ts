import { hc } from "hono/client";
import { ApiRoute } from "../../server/app"

export const api = hc<ApiRoute>("/").api;