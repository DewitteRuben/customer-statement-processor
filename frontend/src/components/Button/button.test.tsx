import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button Component", () => {
  it("renders the button", () => {
    render(<Button text="test" />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
});
