import { InsertTodoSchema, TodoIDSchema, UpdateTodoSchema } from "@server/todo/schema"
import { api } from "@src/api"
import { queryOptions, QueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { z } from "zod"

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
    mutationFn: async (insert: z.infer<typeof InsertTodoSchema>) => {
      queryClient.setQueryData(insertingTodoQueryOption.queryKey, { insert: insert })

      const res = await api.todo.$post({
        json: InsertTodoSchema.parse(insert)
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
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.setQueryData(insertingTodoQueryOption.queryKey, {})
    }
  })
)

export const insertingTodoQueryOption = queryOptions<{
  insert?: z.infer<typeof InsertTodoSchema>
}>({
  queryKey: ["insertingTodo"],
  queryFn: () => ({}),
  staleTime: Infinity
})

export const updateTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async ({ update, id }: { update: z.infer<typeof UpdateTodoSchema>, id: z.infer<typeof TodoIDSchema> }) => {
      const res = await api.todo[":id{[0-9]+}"].$put({
        param: {
          id: TodoIDSchema.parse(id).id.toString()
        },
        json: UpdateTodoSchema.parse(update)
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      return await res.json()
    },
    onSuccess: async (data) => {
      const oldTodos = await queryClient.ensureQueryData(getAllTodosQueryOption)
      queryClient.setQueryData(getAllTodosQueryOption.queryKey, [data, ...oldTodos.filter(todo => todo.id != data.id)])
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })