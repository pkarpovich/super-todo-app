import { describe, it, expect } from "vitest";

import todoReducer, {
  initialState,
  add,
  remove,
  toggle,
  update,
  Todo,
} from "./todos-slice.ts";

describe("counter reducer", () => {
  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle add", () => {
    const newTodo: Todo = {
      id: "33",
      title: "Test",
      description: "Test",
      completed: false,
    };

    const actual = todoReducer(initialState, add(newTodo));
    expect(actual.todos.length).toEqual(initialState.todos.length + 1);
    expect(actual.todos[initialState.todos.length].title).toEqual(
      newTodo.title
    );

    const newTodo2 = {
      id: "44",
      title: "Test2",
      description: "Test2",
      completed: false,
    };
    const actual2 = todoReducer(actual, add(newTodo2));
    expect(actual2.todos.length).toEqual(initialState.todos.length + 2);
    expect(actual2.todos[initialState.todos.length + 1].title).toEqual(
      newTodo2.title
    );
  });

  it("should handle remove", () => {
    const initial = {
      todos: [
        {
          id: "1",
          title: "Test",
          description: "Test",
          completed: false,
        },
        {
          id: "2",
          title: "Test2",
          description: "Test2",
          completed: false,
        },
      ],
    };

    const actual = todoReducer(initial, remove(initial.todos[0].id));
    expect(actual.todos.length).toEqual(1);
    expect(actual.todos[0].id).toEqual("2");
  });

  it("should handle toggle", () => {
    const initial = {
      todos: [
        {
          id: "1",
          title: "Test",
          description: "Test",
          completed: false,
        },
        {
          id: "2",
          title: "Test2",
          description: "Test2",
          completed: false,
        },
      ],
    };

    const actual = todoReducer(initial, toggle(initial.todos[0].id));
    expect(actual.todos[0].completed).toEqual(true);
    expect(actual.todos[1].completed).toEqual(false);
    const actual2 = todoReducer(actual, toggle(initial.todos[0].id));
    expect(actual2.todos[0].completed).toEqual(false);
    expect(actual2.todos[1].completed).toEqual(false);
  });

  it("should handle update", () => {
    const initial = {
      todos: [
        {
          id: "1",
          title: "Test",
          description: "Test",
          completed: false,
        },
      ],
    };

    const actual = todoReducer(
      initial,
      update({ ...initial.todos[0], title: "Test2" })
    );

    expect(actual.todos[0].title).toEqual("Test2");
    expect(actual.todos[0].description).toEqual("Test");

    const actual2 = todoReducer(
      actual,
      update({ ...actual.todos[0], description: "Test2" })
    );
    expect(actual2.todos[0].title).toEqual("Test2");
    expect(actual2.todos[0].description).toEqual("Test2");
  });
});
