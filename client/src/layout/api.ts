import { ACCESS_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from "@server/routes/user/constants";
import { api } from "@src/api";
import { USER_ITEM_KEY } from "@src/type";
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
    localStorage.removeItem(ACCESS_TOKEN_HEADER);
    localStorage.removeItem(REFRESH_TOKEN_HEADER);
    localStorage.removeItem(USER_ITEM_KEY);
    toast.success(data);
    await navigate({to: "/auth"});
  }
});