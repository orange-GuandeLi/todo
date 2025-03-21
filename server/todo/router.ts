import { Hono } from "hono";

import { zValidator } from '../middleware/validator'
import { IDSchema, insertSchema, UpdateSchema } from "./schema";
import { todoModel } from "./model";

export const todo = new Hono()
  .get("/", async (c) => {
    const todos = await todoModel.getAll();
    return c.json(todos, 200);
  })
  .post("/", zValidator("json", insertSchema), async (c) => {
    const json = c.req.valid("json");

    const todo = await todoModel.insert(json);
    if (!todo) {
      throw new Error("Faild to insert todo")
    }
    return c.json(todo, 201);
  })
  .delete("/:id", zValidator("param", IDSchema), async (c) => {
    const id = c.req.valid("param");
    const todo = await todoModel.deleteByID(id)
    if (!todo) {
      throw new Error("Faild to delete todo")
    }

    return c.json(todo, 200);
  })
  .put("/:id", zValidator("param", IDSchema), zValidator("json", UpdateSchema) , async (c) => {
    const id = c.req.valid("param");
    const json = c.req.valid("json");
    const todo = await todoModel.updateByID(id, json)
    if (!todo) {
      throw new Error("Faild to update todo")
    }

    return c.json(todo, 200);
  })