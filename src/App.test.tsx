import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

describe("App", () => {
  it("renders the app title", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("Task Manager");
  });
});

