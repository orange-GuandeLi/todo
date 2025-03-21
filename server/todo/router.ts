import { Hono } from "hono";
import { db } from "../../db";
import { TodoTable, todoTableInsertSchema } from "../../db/schema/todo";
import { eq } from "drizzle-orm";

import { zValidator } from '../middleware/validator'
import { insertSchema } from "./schema";

export const todo = new Hono()
  .get("/", async (c) => {
    const todos = await db
      .select()
      .from(TodoTable)

    return c.json(todos, 200);
  })
  .post("/", zValidator("json", insertSchema), async (c) => {
    const json = c.req.valid("json");

    const todo = await db
     .insert(TodoTable)
     .values(todoTableInsertSchema.parse(json))
     .returning()
     .then(res => res[0]);

    return c.json(todo, 201);
  })
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const todo = await db
      .delete(TodoTable)
      .where(eq(TodoTable.id, +id))
      .returning()
      .then(res => res[0]);

    return c.json(todo, 200);
  })
  .put("/:id", async (c) => {
    const { id } = c.req.param();
    const { title, completed } = await c.req.json();
    const todo = await db
     .update(TodoTable)
     .set({
       title,
       completed,
     })
     .where(eq(TodoTable.id, +id))
     .returning()
    .then(res => res[0]);
    return c.json(todo, 200);
  })