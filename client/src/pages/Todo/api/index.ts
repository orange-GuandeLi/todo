import { TodoRestIDSSchema, TodoRestISchema, TodoRestUSchema } from "@server/routes/todo/api-schema";
import { api } from "@src/api";
import { queryOptions, QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";

export const getAllTodosQueryOption = queryOptions({
  queryKey: ["getAllTodos"],
  queryFn: async () => {
    const res = await api.todo.$get();
    if (!res.ok) {
      throw new Error(await res.text());
    }

    return await res.json();
  },
  staleTime: 5 * 60 * 1000,
})

export const insertTodoMutation = (queryClient: QueryClient) => (
  useMutation({
    mutationKey: ["insertTodo"],
    mutationFn: async (insert: z.infer<typeof TodoRestISchema>) => {
      queryClient.setQueryData(insertingTodoQueryOption.queryKey, { insert: insert })

      const res = await api.todo.$post({
        json: TodoRestISchema.parse(insert),
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
  insert?: z.infer<typeof TodoRestISchema>,
}>({
  queryKey: ["insertingTodo"],
  queryFn: () => ({}),
  staleTime: Infinity
});

export const updateTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async ({ update, id }: { update: z.infer<typeof TodoRestUSchema>, id: z.infer<typeof TodoRestIDSSchema> }) => {
      const res = await api.todo[":id{[0-9]+}"].$put({
        param: {
          id: TodoRestIDSSchema.parse(id).id.toString(),
        },
        json: TodoRestUSchema.parse(update),
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