import { Auth } from "@middleware/auth";
import { Hono } from "hono";

export const todo = () => new Hono()
  .use(Auth)
  .get("/", (c) => {
    return c.text("todo")
  });