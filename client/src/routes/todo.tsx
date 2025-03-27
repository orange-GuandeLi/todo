import { Todo } from '@src/Todo/Todo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todo')({
  component: Todo,
});
