import { v4 as uuid } from "uuid";

export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
  id: string;
  name: string;
  done: boolean;
}

export let todos: Todo[] = [
  {
    id: uuid(),
    name: "Taste htmx",
    done: true,
  },
  {
    id: uuid(),
    name: "Buy a unicorn",
    done: false,
  },
];

export function getTodos(filter: TodoFilter) {
  return filter === "active"
    ? todos.filter((todo) => !todo.done)
    : filter === "completed"
    ? todos.filter((todo) => todo.done)
    : todos;
}

export function getItemsLeft() {
  return todos.filter((todo) => !todo.done).length;
}

export function createTodo(name: string) {
  const newTodo = {
    id: uuid(),
    name,
    done: false,
  };

  todos.push(newTodo);

  return newTodo;
}

export function deleteById(id: string) {
  todos = todos.filter((todo) => todo.id !== id);
}

export function updateTodo(id: string, data: Partial<Exclude<Todo, "id">>) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index >= 0) {
    todos[index] = {
      ...todos[index],
      ...data,
    };
    return todos[index]!;
  }

  throw new Error(`Todo "${id}" not found`);
}

export function clearCompleted() {
  todos = todos.filter((todo) => !todo.done);
}
