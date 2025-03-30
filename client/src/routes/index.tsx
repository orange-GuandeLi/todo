import { Todo } from '@src/pages/Todo/Todo';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Todo,
});