import { insertTodo, selectTodo, TodoDBISchema, TodoDBSSchema, TodoDBUShcema, updateTodo } from "@db/schema/todo";
import { Auth } from "@server/routes/user/auth-middleware";
import { TypeValidator } from "@server/middleware/type-validator";
import { eq, and } from "drizzle-orm";
import { Hono } from "hono";
import type { JwtPayload } from "../user/types";

export const todo = new Hono<{ Variables: JwtPayload }>()
  .use(Auth())
  .get("/",
    async (c) => {
      const userID = c.get("jwtPayload").userID;
      const res = await selectTodo({where: (table) => eq(table.userID, userID)});
      return c.json(res, 200);
    })
  .post("/",
    TypeValidator("json", TodoDBISchema.omit({
      userID: true,
    })),
    async (c) => {
      const userID = c.get("jwtPayload").userID;
      const values = c.req.valid("json");
      const res = await insertTodo({ values: { ...values, userID } });

      return c.json(res, 201);
    })
  .put("/:id{[0-9]+}",
    TypeValidator("json", TodoDBUShcema),
    TypeValidator("param", TodoDBSSchema.pick({
      id: true,
    })),
    async (c) => {
      const id = c.req.valid("param");
      const values = c.req.valid("json");
      const userID = c.get("jwtPayload").userID;
      const res = await updateTodo({
        values,
        where: (table) => 
          and(
            eq(table.id, id.id),
            eq(table.userID, userID),
          ),
      });

      return c.json(res, 200);
    });