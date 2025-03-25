import { insertSchema, IDSchema, UpdateSchema } from "@server/todo/schema"
import { Insert, ID, Update } from "@server/todo/type"
import { api } from "@src/api"
import { queryOptions, QueryClient, useMutation } from "@tanstack/react-query"

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
      queryClient.setQueryData(insertingTodoQueryOption.queryKey, { insert: insert })

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
      const res = await api.todo[":id{[0-9]+}"].$put({
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