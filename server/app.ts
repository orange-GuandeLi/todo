import { Hono } from "hono";
import { todo } from "./todo/router";
import { ZodError } from "zod";

export const app = new Hono()
  .notFound((c) => {
    return c.text("Not Found", 404);
  })
  .onError((err, c) => {
    if (err instanceof ZodError) {
      return c.json(err.issues.map(issue => `[${issue.path.join(", ")}]: ${issue.message}`).join(", "), 400);
    }

    if (err instanceof Error) {
      return c.text(err.message, 400);
    }
    return c.text("Internal Server Error", 500);
  });

const apiRoute = app
  .basePath("/api")
  .route("/todo", todo)
  .get("/ping", (c) => c.text("pong"));