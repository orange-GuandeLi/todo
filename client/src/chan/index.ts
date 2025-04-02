import { SignInRestSSchema } from "@server/routes/user/api-schema";
import { Channel } from "@src/channel";
import { z } from "zod";

export const userItemChan = new Channel<z.infer<typeof SignInRestSSchema> | undefined>();