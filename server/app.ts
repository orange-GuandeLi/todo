import { Hono } from "hono";
import { todo } from "./todo/router";
import { ZodError } from "zod";
import { FormatZodError } from "./util";
import { serveStatic } from "hono/bun";

export const app = new Hono()
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
  .route("/todo", todo)
  .get("/ping", (c) => c.text("pong"));

export type ApiRoute = typeof apiRoute;