import { Hono } from "hono";
import { todo } from "./todo/router";
import { ZodError } from "zod";
import { FormatZodError } from "./util";
import { serveStatic } from "hono/bun";
import { todoModel } from "./todo/model";
import { logger } from "hono/logger";
import { logRemoteAddress } from "./middleware/log-remote-addr";
import { userModel } from "./user/model";
import { user } from "./user/router";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export const app = new Hono()
  .use(logRemoteAddress)
  .use(logger())
  .notFound((c) => {
    return c.text("Not Found", 404);
  })
  .onError((err, c) => {
    let status: ContentfulStatusCode = 400;

    if (Object.hasOwn(err, "status")) {
      // @ts-ignore
      status = err.status;
    }

    if (err instanceof ZodError) {
      return c.text(FormatZodError(err), status);
    }

    if (err instanceof Error) {
      return c.text(err.message, status);
    }

    return c.text("Internal Server Error", 500);
  })
  .use(serveStatic({ root: "./client/dist" }));

const apiRoute = app
  .basePath("/api")
  .route("/todo", todo(todoModel))
  .route("/user", user(userModel))
  .get("/ping", (c) => c.text("pong"));

export type ApiRoute = typeof apiRoute;