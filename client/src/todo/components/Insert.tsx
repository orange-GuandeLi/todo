import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { insertTodoMutation } from "../api";

export function Insert() {
  const [inputStr, setInputStr] = useState("");

  const insertTodo = insertTodoMutation(useQueryClient())

  const insertTodoTigger = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      return;
    }

    const value = e.currentTarget.value.trim();
    if (!value) {
      return;
    }

    if (insertTodo.isPending) {
      return;
    }

    setInputStr("");
    insertTodo.mutate({ title: value })
  }

  return (
    <input type="text" autoFocus placeholder="Type something here..." className="
      w-full focus-visible:outline-none py-4 px-2 rounded bg-white/30 backdrop-blur-sm
      placeholder:relative placeholder:transition-[left,box-shadow] placeholder:left-0
      focus-visible:placeholder:left-4 focus-visible:shadow
      "
      onChange={(e) => setInputStr(e.currentTarget.value)}
      onKeyUp={insertTodoTigger}
      value={inputStr} />
  )
}