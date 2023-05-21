import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithProviders } from "../store/test-utils.tsx";
import { AddTodoItem } from "./AddTodoItem.tsx";
import { setupStore } from "../store/store.ts";

describe("TodoList", () => {
  it("allow input in the title and description fields", () => {
    const { getByTestId } = renderWithProviders(<AddTodoItem />);

    fireEvent.change(getByTestId("title-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByTestId("description-input"), {
      target: { value: "Test Description" },
    });

    expect(getByTestId("title-input")).toHaveValue("Test Title");
    expect(getByTestId("description-input")).toHaveValue("Test Description");
  });

  it("submits form and calls dispatch function", () => {
    const store = setupStore();

    const { getByTestId } = renderWithProviders(<AddTodoItem />, { store });

    fireEvent.change(getByTestId("title-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByTestId("description-input"), {
      target: { value: "Test Description" },
    });
    fireEvent.click(getByTestId("add-todo-submit"));

    expect(getByTestId("title-input")).toHaveValue("");
    expect(getByTestId("description-input")).toHaveValue("");

    expect(store.getState().todos.items[0].title).toEqual("Test Title");
    expect(store.getState().todos.items[0].description).toEqual(
      "Test Description"
    );
  });

  it("does not submit form if title is empty", () => {
    const store = setupStore({
      todos: {
        items: [],
      },
    });

    const { getByTestId } = renderWithProviders(<AddTodoItem />, {
      store,
    });

    fireEvent.change(getByTestId("title-input"), {
      target: { value: "" },
    });
    fireEvent.change(getByTestId("description-input"), {
      target: { value: "Test Description" },
    });
    fireEvent.click(getByTestId("add-todo-submit"));

    expect(getByTestId("title-input")).toHaveValue("");
    expect(getByTestId("description-input")).toHaveValue("Test Description");

    expect(store.getState().todos.items).toHaveLength(0);
  });

  it("allow submit form if description is empty", () => {
    const store = setupStore({
      todos: {
        items: [],
      },
    });

    const { getByTestId } = renderWithProviders(<AddTodoItem />, {
      store,
    });

    fireEvent.change(getByTestId("title-input"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByTestId("description-input"), {
      target: { value: "" },
    });
    fireEvent.click(getByTestId("add-todo-submit"));

    expect(getByTestId("title-input")).toHaveValue("");
    expect(getByTestId("description-input")).toHaveValue("");

    expect(store.getState().todos.items[0].title).toEqual("Test Title");
    expect(store.getState().todos.items[0].description).toEqual("");
  });
});
