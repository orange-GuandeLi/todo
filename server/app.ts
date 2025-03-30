import { Hono } from "hono";
import { ZodError } from "zod";
import { FormatZodError } from "./util";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { LogRemoteAddress } from "./middleware/log-remote-addr";
import { HTTPException } from "hono/http-exception";
import { user } from "./routes/user";
import { todo } from "./routes/todo";

export const app = new Hono()
  .use(LogRemoteAddress())
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
  });

const apiRoute = app
  .basePath("/api")
  .route("/todo", todo)
  .route("/user", user)
  .get("/ping", (c) => c.text("pong"));

app
  .use(serveStatic({ root: "./client/dist" }))
  .use(serveStatic({ path: "./client/dist/index.html" }));

export type ApiRoute = typeof apiRoute;