import { Hono } from "hono";
import { Auth } from "../../middleware/auth";
import { db } from "../../../db";
import { TodoTable } from "../../../db/schema/todo";
import { eq } from "drizzle-orm";
import type { JwtPayload } from "../../types";

export const todo = new Hono<{ Variables: JwtPayload }>()
  .use(Auth)
  .get("/", async (c) => {
    const userID = c.get("jwtPayload").userID;
    const res = await db
      .select()
      .from(TodoTable)
      .where(eq(TodoTable.userID, userID));
    return c.json(res, 200);
  })
  // .post("/", zValidator("json", InsertTodoSchema) ,async (c) => {
  //   const userID = c.get("jwtPayload").userID;
  //   const insert = c.req.valid("json");
  //   const res = await todoModel.insertOne({...insert, userID});
  //   if (!res) {
  //     throw new Error("Faild to insert Todo");
  //   }

  //   return c.json(res, 201);
  // })
  // .put("/:id{[0-9]+}", zValidator("json", UpdateTodoSchema), zValidator("param", TodoIDSchema), async (c) => {
  //   const id = c.req.valid("param");
  //   const update = c.req.valid("json");
  //   const userID = c.get("jwtPayload").userID;
  //   const res = await todoModel.updateOneByID({...update, id: id.id, userID });
  //   if (!res) {
  //     throw new Error("Faild to update Todo");
  //   }

  //   return c.json(res, 200);
  // });