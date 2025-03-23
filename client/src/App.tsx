import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllTodosQueryOption, insertingTodoQueryOption, insertTodoMutation, updateTodoMutation } from './api'
import './App.css'
import React, { useState } from 'react'

function App() {
  const [inputStr, setInputStr] = useState("");

  const queryClient = useQueryClient()
  const getAllTodos = useQuery(getAllTodosQueryOption)
  const insertTodo = insertTodoMutation(queryClient)
  const insertingTodo = useQuery(insertingTodoQueryOption)
  const updateTodo = updateTodoMutation(queryClient)

  const unCompleted = getAllTodos.data?.filter((todo) => !todo.completed);
  const completed = getAllTodos.data?.filter((todo) => todo.completed);

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

  const markAsCompleted = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    updateTodo.mutate({
      update: {
        completed: e.currentTarget.checked,
      },
      id: { id }
    })
  }

  let content = <>
    {
      insertingTodo.data?.insert
        ? <li className="flex gap-4 items-center p-2 group has-checked:text-black/30 relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 animate-spin">
            <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
          </svg>
          <span className="truncate group-has-checked:line-through">{insertingTodo.data.insert.title}</span>
        </li>
        : undefined
    }

    {
      unCompleted?.map(todo => (
        <li className="flex gap-4 items-center p-2 group has-checked:text-black/30 relative" key={todo.id}>
          <input type="checkbox" className="hidden" id={`${todo.id}`} checked={todo.completed} onChange={(e) => {
            markAsCompleted(e, todo.id)
          }} disabled={updateTodo.isPending && updateTodo.variables.id.id == todo.id } />
          <label htmlFor={`${todo.id}`} className="
              rounded-md h-4 w-4 border-2 border-black/70 shrink-0 flex items-center justify-center text-transparent cursor-pointer
            group-has-checked:text-black/70">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
            </svg>
          </label>
          <span className="truncate group-has-checked:line-through">{todo.title}</span>
        </li>
      ))
    }

    {
      completed?.length ? <li className="px-4 py-2 bg-white/30 w-fit rounded font-bold my-4">Completed</li> : undefined
    }

    {
      completed?.map(todo => (
        <li className="flex gap-4 items-center p-2 group has-checked:text-black/30 relative" key={todo.id}>
          <input type="checkbox" className="hidden" id={`${todo.id}`} checked={todo.completed} onChange={(e) => {
            markAsCompleted(e, todo.id)
          }} disabled={updateTodo.isPending && updateTodo.variables.id.id == todo.id } />
          <label htmlFor={`${todo.id}`} className="
              rounded-md h-4 w-4 border-2 border-black/70 shrink-0 flex items-center justify-center text-transparent cursor-pointer
            group-has-checked:text-black/70">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
            </svg>
          </label>
          <span className="truncate group-has-checked:line-through">{todo.title}</span>
        </li>
      ))
    }
  </>

  if (getAllTodos.isLoading) {
    content = <>
      <li className="animate-pulse mb-2">
        <div className="h-2 rounded-full bg-gray-200 w-2/10"></div>
      </li>
      <li className="animate-pulse mb-2">
        <div className="h-2 rounded-full bg-gray-200 w-1/10"></div>
      </li>
      <li className="animate-pulse mb-2">
        <div className="h-2 rounded-full bg-gray-200 w-4/10"></div>
      </li>
      <li className="animate-pulse mb-2">
        <div className="h-2 rounded-full bg-gray-200 w-4/10"></div>
      </li>
      <li className="animate-pulse mb-2">
        <div className="h-2 rounded-full bg-gray-200 w-6/10"></div>
      </li>
      <li className="animate-pulse mb-2">
        <div className="h-2 rounded-full bg-gray-200 w-6/10"></div>
      </li>
    </>
  }

  if (getAllTodos.isError) {
    content = <li className="flex flex-col gap-4 items-center text-red-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
      <span>Faild To Get Data</span>
      <span>{getAllTodos.error.message}</span>
    </li>
  }

  return (
    <main className="w-svw h-svh bg-[url(assets/images/bg.jpg)] bg-center bg-cover overflow-hidden">
      <div className="bg-white/30 backdrop-blur-sm h-full flex flex-col">
        <header className="px-8 py-4 shrink-0 shadow m-auto whitespace-nowrap">
          <span className="font-bold text-lg">Orange Todo</span>
          <a href="https://github.com/orange-GuandeLi/todo" target="_blank" className="
            text-xs ml-4 bg-linear-to-tr from-indigo-500 via-purple-500
            to-pink-500 bg-clip-text text-transparent">@Orange-GuandeLi</a>
        </header>

        <section className="p-6 flex-1 flex flex-col overflow-hidden">
          <input type="text" autoFocus placeholder="Type something here..." className="
            w-full focus-visible:outline-none py-4 px-2 rounded bg-white/30 backdrop-blur-sm
            placeholder:relative placeholder:transition-[left,box-shadow] placeholder:left-0
            focus-visible:placeholder:left-4 focus-visible:shadow
            "
            onChange={(e) => setInputStr(e.currentTarget.value)}
            onKeyUp={insertTodoTigger}
            value={inputStr} />

          <ul className="mt-8 overflow-y-auto no-scrollbar">
            {content}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default App
