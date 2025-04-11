import { api } from "@src/api";
import { SignOut } from "@src/util";
import { useMutation } from "@tanstack/react-query";
import { UseNavigateResult } from "@tanstack/react-router";
import { toast } from "react-toastify";

export const signOutMutation = (navigate: UseNavigateResult<string>) => useMutation({
  mutationKey: ["signOut"],
  mutationFn: async () => {
    const res = await api.user.signOut.$delete();

    return await res.text();
  },
  onSuccess: async (data) => {
    await SignOut();
    toast.success(data);
    await navigate({to: "/auth"});
  }
});