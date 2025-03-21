import { Hono } from "hono";
import { todo } from "./todo/router";

export const app = new Hono();

const apiRoute = app
  .basePath("/api")
  .route("/todo", todo)
  .get("/ping", (c) => c.text("pong"));