import { SignInRestSchema } from "@server/routes/user/api-schema";
import { api } from "@src/api";
import { SignIn } from "@src/util";
import { useMutation } from "@tanstack/react-query";
import { UseNavigateResult } from "@tanstack/react-router";
import { z } from "zod";

export const signInMutation = (navigate: UseNavigateResult<string>) => useMutation({
  mutationKey: ["signIn"],
  mutationFn: async (signIn: z.infer<typeof SignInRestSchema>) => {
    const res = await api.user.signIn.$post({
      json: SignInRestSchema.parse(signIn),
    });

    return await res.json();
  },
  onSuccess: async (data) => {
    await SignIn(data);
    await navigate({to: "/"});
  }
});