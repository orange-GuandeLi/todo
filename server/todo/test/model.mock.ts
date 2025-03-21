import type { TodoModel } from "../interface";
import type { Todo } from "../type";

export const mockTodos: Todo[] = [
  {
    id: 1,
    title: "todo1",
    description: "todo1",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const mockTodoModel: TodoModel = {
  getAll: async () => {
    return mockTodos;
  },
  insert: async (insert) => {
    const todo = {
      ...insert,
      description: null,
      completed: false,
      id: mockTodos.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockTodos.push(todo);
    return todo;
  },
  deleteByID: async (id) => {
    const todo = mockTodos.find(todo => todo.id === id.id);
    if (!todo) return;
    mockTodos.splice(mockTodos.indexOf(todo), 1);
    return todo;
  },
  updateByID: async (id, update) => {
    const todo = mockTodos.find(todo => todo.id === id.id);
    if (!todo) return;
    Object.assign(todo, update);
    return todo;
  }
}