import { hc } from "hono/client";
import { ApiRoute } from "@server/app"
import { QueryClient, queryOptions, useMutation } from "@tanstack/react-query";
import { ID, Insert, Update } from "@server/todo/type";
import { IDSchema, insertSchema, UpdateSchema } from "@server/todo/schema";

const api = hc<ApiRoute>("/").api;

export const getAllTodosQueryOption = queryOptions({
  queryKey: ["getAllTodos"],
  queryFn: async () => {
    const res = await api.todo.$get()
    if (!res.ok) {
      throw new Error(await res.text())
    }

    return await res.json()
  },
  staleTime: 5 * 60 * 1000
})

export const insertTodoMutation = (queryClient: QueryClient) => (
  useMutation({
    mutationKey: ["insertTodo"],
    mutationFn: async (insert: Insert) => {
      queryClient.setQueryData(insertingTodoQueryOption.queryKey, {insert: insert})

      const res = await api.todo.$post({
        json: insertSchema.parse(insert)
      })
  
      if (!res.ok) {
        throw new Error(await res.text())
      }
  
      return await res.json();
    },
    onSuccess: async (data) => {
      const oldTodos = await queryClient.ensureQueryData(getAllTodosQueryOption)
      queryClient.setQueryData(getAllTodosQueryOption.queryKey, [data, ...oldTodos])
    },
    onSettled: () => {
      queryClient.setQueryData(insertingTodoQueryOption.queryKey, {})
    }
  })
)

export const insertingTodoQueryOption = queryOptions<{
  insert?: Insert
}>({
  queryKey: ["insertingTodo"],
  queryFn: () => ({}),
  staleTime: Infinity
})

export const updateTodoMutation = (queryClient: QueryClient) => 
  useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async ({ update, id }: { update: Update, id: ID }) => {
      const res = await api.todo[":id"].$put({
        param: {
          id: IDSchema.parse(id).id.toString()
        },
        json: UpdateSchema.parse(update)
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }
      
      return await res.json()
    },
    onSuccess: async (data) => {
      const oldTodos = await queryClient.ensureQueryData(getAllTodosQueryOption)
      queryClient.setQueryData(getAllTodosQueryOption.queryKey, [data, ...oldTodos.filter(todo => todo.id != data.id)])
    }
  })