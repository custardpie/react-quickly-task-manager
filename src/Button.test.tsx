import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders an icon button with label", () => {
    render(<Button label="Add step" icon="plus" />);

    const button = screen.getByRole("button");
    const icon = screen.getByAltText("Add step");

    expect(button).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "icons/plus.svg");
  });
});
