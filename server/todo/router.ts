import { Hono } from "hono";

import { zValidator } from '../middleware/validator'
import { IDSchema, InsertSchema, UpdateSchema } from "./schema";
import type { TodoModel } from "./interface";
import { jwt } from "hono/jwt";

export const todo = (model: TodoModel) => new Hono()
  .use(jwt({ secret: process.env.JWT_SECRET! }))
  .get("/", async (c) => {
    const todos = await model.getAll();
    return c.json(todos, 200);
  })
  .post("/", zValidator("json", InsertSchema), async (c) => {
    const json = c.req.valid("json");

    const todo = await model.insert(json);
    if (!todo) {
      throw new Error("Faild to insert Todo")
    }
    return c.json(todo, 201);
  })
  .delete("/:id{[0-9]+}", zValidator("param", IDSchema), async (c) => {
    const id = c.req.valid("param");
    const todo = await model.deleteByID(id)
    if (!todo) {
      throw new Error("Faild to delete Todo")
    }

    return c.json(todo, 200);
  })
  .put("/:id{[0-9]+}", zValidator("param", IDSchema), zValidator("json", UpdateSchema) , async (c) => {
    const id = c.req.valid("param");
    const json = c.req.valid("json");
    const todo = await model.updateByID(id, json)
    if (!todo) {
      throw new Error("Faild to update Todo")
    }

    return c.json(todo, 200);
  })