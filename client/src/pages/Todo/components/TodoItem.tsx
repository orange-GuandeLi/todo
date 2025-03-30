import { Todo } from "@server/todo/type";
import { useQueryClient } from "@tanstack/react-query";
import { updateTodoMutation } from "../api";

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

  const deleteTodoTigger = () => {
    console.log("aa")
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
      <p className="flex gap-2 justify-start overflow-hidden">
        <span className={`truncate group-has-checked:line-through ${changing ? "text-black/30" : "text-black/70"}`}>{title}</span>
        
        <button onClick={deleteTodoTigger} className="
          cursor-pointer h-6 w-6 place-content-center rounded-full text-red-400 shrink-0 bg-white/70 hidden
          group-hover:grid
          ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        </button>
      </p>
    </li>
  );
}