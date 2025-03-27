import { Hono } from "hono";

import { zValidator } from '../middleware/validator'
import { IDSchema, InsertSchema, UpdateSchema } from "./schema";
import type { TodoModel } from "./interface";
import { Auth } from "../middleware/auth";
import type { JwtPayload } from "../type";

export const todo = (model: TodoModel) => new Hono<{ Variables: {
  jwtPayload: JwtPayload
} }>()
  .use(Auth)
  .get("/", async (c) => {
    const userID = c.get("jwtPayload").userID;
    console.log(userID);
    const todos = await model.findManyByUserID({id: userID});
    return c.json(todos, 200);
  })
  .post("/", zValidator("json", InsertSchema), async (c) => {
    const json = c.req.valid("json");
    const userID = c.get("jwtPayload").userID;
    const todo = await model.insert({...json, userID: userID});
    if (!todo) {
      throw new Error("Faild to insert Todo")
    }
    return c.json(todo, 201);
  })
  .delete("/:id{[0-9]+}", zValidator("param", IDSchema), async (c) => {
    const id = c.req.valid("param");
    const userID = c.get("jwtPayload").userID;
    const todo = await model.deleteByID({id: id.id, userID: userID});
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