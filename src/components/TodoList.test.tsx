import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Todo } from "../store/todos-slice.ts";
import { TodoList } from "./TodoList";
import { renderWithProviders } from "../store/test-utils.tsx";

describe("TodoList", () => {
  it("renders todos correctly", () => {
    const todos: Todo[] = [
      {
        id: "1",
        title: "Todo 1",
        description: "Description 1",
        completed: false,
      },
      {
        id: "2",
        title: "Todo 2",
        description: "Description 2",
        completed: true,
      },
    ];

    const { getByText } = renderWithProviders(<TodoList />, {
      preloadedState: {
        todos: {
          todos,
        },
      },
    });

    expect(getByText("Todo 1")).toBeInTheDocument();
    expect(getByText("Description 1")).toBeInTheDocument();
    expect(getByText("Todo 2")).toBeInTheDocument();
    expect(getByText("Description 2")).toBeInTheDocument();
  });

  it("handle remove correctly", () => {
    const todos: Todo[] = [
      {
        id: "1",
        title: "Todo 1",
        description: "Description 1",
        completed: false,
      },
      {
        id: "2",
        title: "Todo 2",
        description: "Description 2",
        completed: true,
      },
    ];

    const { getByText, queryByText, getAllByTestId } = renderWithProviders(
      <TodoList />,
      {
        preloadedState: {
          todos: {
            todos,
          },
        },
      }
    );

    expect(getByText("Todo 1")).toBeInTheDocument();
    expect(getByText("Todo 2")).toBeInTheDocument();

    fireEvent.click(getAllByTestId("remove-icon")[0]);

    expect(queryByText("Todo 1")).not.toBeInTheDocument();
    expect(getByText("Todo 2")).toBeInTheDocument();
  });

  it("handle toggle correctly", () => {
    const todos: Todo[] = [
      {
        id: "1",
        title: "Todo 1",
        description: "Description 1",
        completed: false,
      },
      {
        id: "2",
        title: "Todo 2",
        description: "Description 2",
        completed: true,
      },
    ];

    const { getByText, getAllByTestId } = renderWithProviders(<TodoList />, {
      preloadedState: {
        todos: {
          todos,
        },
      },
    });

    expect(getByText("Todo 1")).toBeInTheDocument();
    expect(getByText("Todo 2")).toBeInTheDocument();

    fireEvent.click(getAllByTestId("toggle-icon")[0]);

    expect(getByText("Todo 1")).toBeInTheDocument();
    expect(getByText("Todo 2")).toBeInTheDocument();
  });
});
