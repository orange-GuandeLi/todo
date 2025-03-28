import { Hono } from "hono";
import { zValidator } from "../../middleware/validator";
import { InsertUserSchema, SelectUserSchema } from "../../types/user";
import { db } from "../../../db";
import { UserTable } from "../../../db/schema/user";

export const user = new Hono()
  .post("/", zValidator("json", InsertUserSchema), async (c) => {
    const insert = c.req.valid("json");
    insert.password = await Bun.password.hash(insert.password);

    const res = await db
      .insert(UserTable)
      .values(insert)
      .returning()
      .then(r => r[0]);

    if (!res) {
      throw new Error("Faild to insert User");
    }

    return c.json(
      SelectUserSchema
        .parse(res),
      201,
    );
  });