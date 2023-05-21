import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt: number | null;
  createdAt: number;
};

export type UpdateTodoPayload = {
  id: string;
  title: string;
  description: string;
};

export type AddTodoPayload = Omit<UpdateTodoPayload, "id">;

export interface TodoState {
  items: Todo[];
}

export const initialState: TodoState = {
  items: [
    {
      id: "1",
      title: "Eat",
      description: "Eat something, preferably something healthy and nutritious",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    },
    {
      id: "2",
      title: "Sleep",
      description: "Sleep for 8 hours",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    },
    {
      id: "3",
      title: "Code",
      description: "Code todo app",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    },
    {
      id: "4",
      title: "Repeat",
      description: "Repeat",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddTodoPayload>) => {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        completedAt: null,
        createdAt: new Date().getTime(),
      };

      state.items = [newTodo, ...state.items];
    },
    remove: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    toggle: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().getTime() : null;
      }
    },
    update: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
  },
});

export const { add, remove, toggle, update } = todosSlice.actions;

export const selectTodos = createSelector(
  (state: RootState) => state.todos.items,
  (todos) =>
    [...todos].sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      }

      if (!a.completed && b.completed) {
        return -1;
      }

      if (!a.completed && !b.completed) {
        return b.createdAt - a.createdAt;
      }

      if (a.completedAt && b.completedAt) {
        return b.completedAt - a.completedAt;
      }

      return 0;
    })
);

export default todosSlice.reducer;
