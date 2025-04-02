import { ACCESS_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "@server/routes/user/constants";
import { userItemChan } from "./chan";
import { USER_ITEM_KEY } from "./type";
import { z } from "zod";
import { SignInRestSSchema } from "@server/routes/user/api-schema";

export function PartitionArray<T>({array, predicate}: {array?: T[], predicate: (item: T) => boolean}): [T[], T[]] {
  if (!array) {
    return [[], []] as [T[], T[]];
  }

  return array.reduce((init, current) => {
    init[predicate(current) ? 0 : 1].push(current);
    return init;
  }, [[], []] as [T[], T[]])
}

export async function SignOut() {
  localStorage.removeItem(ACCESS_TOKEN_HEADER);
  localStorage.removeItem(REFRESH_TOKEN_HEADER);
  localStorage.removeItem(USER_ITEM_KEY);
  await userItemChan.push(undefined);
}

export async function SignIn(data: z.infer<typeof SignInRestSSchema>) {
  localStorage.setItem(USER_ITEM_KEY, JSON.stringify(data));
  await userItemChan.push(data);
}
