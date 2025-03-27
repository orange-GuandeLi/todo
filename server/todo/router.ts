import { Auth } from "@middleware/auth";
import { Hono } from "hono";
import type { JwtPayload } from "server/type";
import type { TodoModel } from "./interface";
import { TodoTableInsertSchema, TodoTableSelectSchema, TodoTableUpdateSchema } from "@db/schema/todo";
import { zValidator } from "@middleware/validator";

type Variables = {
  jwtPayload: JwtPayload;
}

const InsertTodoSchema = TodoTableInsertSchema.pick({
  title: true,
  description: true,
  completed: true,
});

const UpdateTodoSchema = TodoTableUpdateSchema.pick({
  title: true,
  description: true,
  completed: true,
});

const TodoIDSchema = TodoTableSelectSchema.pick({
  id: true,
})

export const todo = (todoModel: TodoModel) => new Hono<{ Variables: Variables }>()
  .use(Auth)
  .get("/", async (c) => {
    const userID = c.get("jwtPayload").userID;
    const res = await todoModel.findManyByUser({ id: userID });
    return c.json(res, 200);
  })
  .post("/", zValidator("json", InsertTodoSchema) ,async (c) => {
    const userID = c.get("jwtPayload").userID;
    const insert = c.req.valid("json");
    const res = await todoModel.insertOne({...insert, userID});
    if (!res) {
      throw new Error("Faild to insert Todo");
    }

    return c.json(res, 201);
  })
  .put("/:id{[0-9]+}", zValidator("json", UpdateTodoSchema), zValidator("param", TodoIDSchema), async (c) => {
    const id = c.req.valid("param");
    const update = c.req.valid("json");
    const userID = c.get("jwtPayload").userID;
    const res = await todoModel.updateOneByID({...update, id: id.id, userID });
    if (!res) {
      throw new Error("Faild to update Todo");
    }

    return c.json(res, 200);
  });