import { useQuery } from "@tanstack/react-query";
import { TodoItem } from "./components/TodoItem";
import { Inserting } from "./components/Inserting";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Insert } from "./components/Insert";
import { PartitionArray } from "@src/util";
import { getAllTodosQueryOption } from "./api";

export function Todo() {
  const getAllTodos = useQuery(getAllTodosQueryOption);

  const [completed, unCompleted] = PartitionArray({ array: getAllTodos.data, predicate: (item) => item.completed })

  let content = <>
    <Inserting />

    {
      getAllTodos.data?.length ? undefined : <li className="px-4 py-2 bg-white/30 w-fit rounded font-bold my-4">No Data Found</li>
    }

    {
      unCompleted?.map(todo => (
        <TodoItem {...todo} key={todo.id} />
      ))
    }

    {
      completed?.length ? <li className="px-4 py-2 bg-white/30 w-fit rounded font-bold my-4">Completed ({ completed.length })</li> : undefined
    }

    {
      completed?.map(todo => (
        <TodoItem {...todo} key={todo.id} />
      ))
    }
  </>

  if (getAllTodos.isLoading) {
    content = <Loading />
  }

  if (getAllTodos.isError) {
    content = <Error message={getAllTodos.error.message} />
  }

  return (
    <section className="bg-white/30 backdrop-blur-sm size-full flex flex-col overflow-hidden">
      <div className="p-6 flex-1 flex flex-col overflow-hidden">
        <Insert />
        <ul className="mt-8 overflow-y-auto no-scrollbar">
          {content}
        </ul>
      </div>
    </section>
  )
}