import { Hono } from "hono";
import { todo } from "./todo/router";
import { ZodError } from "zod";
import { FormatZodError } from "./util";
import { serveStatic } from "hono/bun";
import { todoModel } from "./todo/model";
import { logger } from "hono/logger";
import { logRemoteAddress } from "./middleware/log-remote-addr";

export const app = new Hono()
  .use(logRemoteAddress)
  .use(logger())
  .notFound((c) => {
    return c.text("Not Found", 404);
  })
  .onError((err, c) => {
    if (err instanceof ZodError) {
      return c.text(FormatZodError(err), 400);
    }

    if (err instanceof Error) {
      return c.text(err.message, 500);
    }

    return c.text("Internal Server Error", 500);
  })
  .use(serveStatic({ root: "./client/dist" }));

const apiRoute = app
  .basePath("/api")
  .route("/todo", todo(todoModel))
  .get("/ping", (c) => c.text("pong"));

export type ApiRoute = typeof apiRoute;