import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [
    {
      id: "1",
      title: "Learn React",
      description:
        "Learn React and TypeScript with Redux Toolkit and Linaria to build a Todo App",
      completed: false,
    },
    {
      id: "2",
      title: "Build Todo App",
      description: "Build super simple Todo App",
      completed: false,
    },
    {
      id: "3",
      title: "Implement todo slice",
      description: "Implement todo slice with Redux Toolkit",
      completed: false,
    },
    {
      id: "4",
      title: "Review and test",
      description: "Review and test todo app",
      completed: false,
    },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggle: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    update: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
  },
});

export const { add, remove, toggle, update } = todosSlice.actions;

export const selectTodos = (state: { todos: TodoState }) => state.todos.todos;

export default todosSlice.reducer;
