import { Hono } from "hono";

import { zValidator } from '../middleware/validator'
import { IDSchema, insertSchema, UpdateSchema } from "./schema";
import type { TodoModel } from "./interface";

export const todo = (model: TodoModel) => new Hono()
  .get("/", async (c) => {
    const todos = await model.getAll();
    return c.json(todos, 200);
  })
  .post("/", zValidator("json", insertSchema), async (c) => {
    const json = c.req.valid("json");

    const todo = await model.insert(json);
    if (!todo) {
      throw new Error("Faild to insert todo")
    }
    return c.json(todo, 201);
  })
  .delete("/:id", zValidator("param", IDSchema), async (c) => {
    const id = c.req.valid("param");
    const todo = await model.deleteByID(id)
    if (!todo) {
      throw new Error("Faild to delete todo")
    }

    return c.json(todo, 200);
  })
  .put("/:id", zValidator("param", IDSchema), zValidator("json", UpdateSchema) , async (c) => {
    const id = c.req.valid("param");
    const json = c.req.valid("json");
    const todo = await model.updateByID(id, json)
    if (!todo) {
      throw new Error("Faild to update todo")
    }

    return c.json(todo, 200);
  })