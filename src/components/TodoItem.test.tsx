import { describe, it, expect, vi } from "vitest";

import { render, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  it("renders title and description correctly", () => {
    const { getByText } = render(
      <TodoItem
        title="Test Title"
        description="Test Description"
        completed={false}
        onToggle={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
  });

  it("handles toggle correctly", () => {
    const handleToggle = vi.fn();
    const { getByTestId } = render(
      <TodoItem
        title="Test Title"
        description="Test Description"
        completed={false}
        onToggle={handleToggle}
        onRemove={vi.fn()}
      />
    );
    fireEvent.click(getByTestId("toggle-icon"));
    expect(handleToggle).toHaveBeenCalled();
  });

  it("handles remove correctly", () => {
    const handleRemove = vi.fn();
    const { getByTestId } = render(
      <TodoItem
        title="Test Title"
        description="Test Description"
        completed={false}
        onToggle={vi.fn()}
        onRemove={handleRemove}
      />
    );
    fireEvent.click(getByTestId("remove-icon"));
    expect(handleRemove).toHaveBeenCalled();
  });
});
