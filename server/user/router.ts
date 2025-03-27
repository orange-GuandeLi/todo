import type { UserModel } from "./interface";
import { Hono } from "hono";
import { zValidator } from "@middleware/validator";

import { UserTableInsertSchema, UserTableSelectSchema } from "@db/schema/user";

const InsertUserSchema = UserTableInsertSchema.pick({
  email: true,
  password: true,
});

export const user = (model: UserModel) => new Hono()
  .post("/", zValidator("json", InsertUserSchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await Bun.password.hash(insert.password);

    const res = await model.insertOne(insert);
    if (!res) {
      throw new Error("Faild to insert User");
    }

    return c.json(
      UserTableSelectSchema.omit({
        password: true,
      })
        .parse(res),
      201
    );
  });