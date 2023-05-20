import { expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CircleCheckbox from "./CircleCheckbox";

describe("CircleCheckbox", () => {
  it("renders checkbox correctly", () => {
    const { getByRole } = render(
      <CircleCheckbox id="test-id" checked={false} onChange={vi.fn()} />
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("checks checkbox correctly", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <CircleCheckbox id="test-id" checked={false} onChange={handleChange} />
    );
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows correct state when checked prop is true", () => {
    const { getByRole } = render(
      <CircleCheckbox id="test-id" checked={true} onChange={vi.fn()} />
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
