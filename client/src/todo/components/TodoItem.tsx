import { Todo } from "@server/todo/type";
import { updateTodoMutation } from "../../api";
import { useQueryClient } from "@tanstack/react-query";

export function TodoItem(todo: Todo) {
  const { id, completed, title } = todo;

  const updateTodo = updateTodoMutation(useQueryClient())

  const markAsCompleted = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    updateTodo.mutate({
      update: {
        completed: e.currentTarget.checked,
      },
      id: { id }
    })
  }

  const changing = updateTodo.isPending && updateTodo.variables.id.id == id;

  return (
    <li className="flex gap-4 items-center p-2 group has-checked:text-black/30">
      <input type="checkbox" className="hidden" id={`${id}`} checked={completed} onChange={(e) => {
        markAsCompleted(e, id)
      }} disabled={changing} />
      <label htmlFor={`${id}`} className={`
          rounded-md h-4 w-4 border-2 shrink-0 flex items-center justify-center text-transparent cursor-pointer
          ${changing ? "border-black/30 group-has-checked:text-black/30" : "border-black/70 group-has-checked:text-black/70" }`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
        </svg>
      </label>
      <span className="truncate group-has-checked:line-through">{title}</span>
    </li>
  );
}