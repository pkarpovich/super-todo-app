import { describe, it, expect } from "vitest";

import todoReducer, {
  initialState,
  add,
  remove,
  toggle,
  update,
  Todo,
} from "./todos-slice.ts";

const initial = {
  items: [
    {
      id: "1",
      title: "Test",
      description: "Test",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    },
    {
      id: "2",
      title: "Test2",
      description: "Test2",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    },
  ],
};

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
      completedAt: null,
      createdAt: new Date().getTime(),
    };

    const actual = todoReducer(initialState, add(newTodo));
    expect(actual.items.length).toEqual(initialState.items.length + 1);
    expect(actual.items[0].title).toEqual(newTodo.title);

    const newTodo2 = {
      id: "44",
      title: "Test2",
      description: "Test2",
      completed: false,
      completedAt: null,
      createdAt: new Date().getTime(),
    };
    const actual2 = todoReducer(actual, add(newTodo2));
    expect(actual2.items.length).toEqual(initialState.items.length + 2);
    expect(actual2.items[0].title).toEqual(newTodo2.title);
  });

  it("should handle remove", () => {
    const actual = todoReducer(initial, remove(initial.items[0].id));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].id).toEqual("2");
  });

  it("should handle toggle", () => {
    const actual = todoReducer(initial, toggle(initial.items[0].id));
    expect(actual.items[0].completed).toEqual(true);
    expect(actual.items[1].completed).toEqual(false);

    const actual2 = todoReducer(actual, toggle(initial.items[0].id));
    expect(actual2.items[0].completed).toEqual(false);
    expect(actual2.items[1].completed).toEqual(false);
  });

  it("should handle update", () => {
    const initial = {
      items: [
        {
          id: "1",
          title: "Test",
          description: "Test",
          completed: false,
          completedAt: null,
          createdAt: new Date().getTime(),
        },
      ],
    };

    const actual = todoReducer(
      initial,
      update({ ...initial.items[0], title: "Test2" })
    );

    expect(actual.items[0].title).toEqual("Test2");
    expect(actual.items[0].description).toEqual("Test");

    const actual2 = todoReducer(
      actual,
      update({ ...actual.items[0], description: "Test2" })
    );
    expect(actual2.items[0].title).toEqual("Test2");
    expect(actual2.items[0].description).toEqual("Test2");
  });
});
