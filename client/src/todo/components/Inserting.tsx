import { useQuery } from "@tanstack/react-query"
import { insertingTodoQueryOption } from "@src/api"

export function Inserting() {
  const insertingTodo = useQuery(insertingTodoQueryOption)

  if (!insertingTodo.data?.insert) {
    return undefined;
  }

  return (
    <li className="flex gap-4 items-center p-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 animate-spin">
        <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
      </svg>
      <span className="truncate">{insertingTodo.data.insert.title}</span>
    </li>
  )
}