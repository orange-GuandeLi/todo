import type { SQL } from "drizzle-orm";
import type { z } from "zod";
import { RefreshTokenDBISchema, RefreshTokenTable, RefreshTokenDBUSchema } from "../../../db/schema/refresh-token";
import { UserDBISchema, UserTable, UserDBUSchema } from "../../../db/schema/user";
import { DBInsert, DBUpdate, DBSelect } from "../../../db/util";

export async function insertRefreshToken({ values } : {values: z.infer<typeof RefreshTokenDBISchema>}) {
  return await DBInsert({
    table: RefreshTokenTable,
    values: RefreshTokenDBISchema.parse(values),
  });
}

export async function updateRefreshToken(
  {values, where} :
  {
    values: z.infer<typeof RefreshTokenDBUSchema>,
    where?: (table: typeof RefreshTokenTable) => SQL | undefined,
  }
) {
  return await DBUpdate({
    table: RefreshTokenTable,
    values: RefreshTokenDBUSchema.parse(values),
    where: where,
  });
}

export async function selectRefreshToken({ where } : {where?: (table: typeof RefreshTokenTable) => SQL | undefined}) {
  return await DBSelect({ table: RefreshTokenTable, where });
}

export async function insertUser({ values } : {values: z.infer<typeof UserDBISchema>}) {
  return await DBInsert({
    table: UserTable,
    values: UserDBISchema.parse(values),
  });
}

export async function updateUser(
  {values, where} :
  {
    values: z.infer<typeof UserDBUSchema>,
    where?: (table: typeof UserTable) => SQL | undefined,
  }
) {
  return await DBUpdate({
    table: UserTable,
    values: UserDBUSchema.parse(values),
    where: where,
  });
}

export async function selectUser({ where } : {where?: (table: typeof UserTable) => SQL | undefined}) {
  return await DBSelect({ table: UserTable, where });
}
