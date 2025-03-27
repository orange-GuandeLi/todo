import { Hono } from "hono";
import { ZodError } from "zod";
import { FormatZodError } from "./util";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { logRemoteAddress } from "./middleware/log-remote-addr";
import { userModel } from "./user/model";
import { user } from "./user/router";
import { HTTPException } from "hono/http-exception";
import { auth } from "./auth/router";
import { tokenModel } from "./auth/model";

export const app = new Hono()
  .use(logRemoteAddress)
  .use(logger())
  .notFound((c) => {
    return c.text("Not Found", 404);
  })
  .onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.text(err.message, err.status)
    }

    if (err instanceof ZodError) {
      return c.text(FormatZodError(err), 400);
    }

    if (err instanceof Error) {
      return c.text(err.message, 400);
    }

    return c.text("Internal Server Error", 500);
  })
  .use(serveStatic({ root: "./client/dist" }));

const apiRoute = app
  .basePath("/api")
  .route("/auth", auth(userModel, tokenModel))
  // .route("/todo", todo(todoModel))
  .route("/user", user(userModel))
  .get("/ping", (c) => c.text("pong"));

export type ApiRoute = typeof apiRoute;