import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AMPButton } from "../components/shared/AMPButton";
import { MdClose } from "react-icons/md";

describe("AMPButton component", () => {
  it("renders button with text", () => {
    render(<AMPButton name="Click me" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<AMPButton name="Click me" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /Click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary class when type is primary", () => {
    render(<AMPButton name="Click me" type="primary" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toHaveClass(
      "bg-amp-500",
      "text-white",
      "p-1.5",
      "px-3",
      "rounded-sm"
    );
  });

  it("applies secondary class when type is secondary", () => {
    render(<AMPButton name="Click me" type="secondary" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toHaveClass(
      "bg-amp-300",
      "text-white",
      "p-1.5",
      "px-3",
      "rounded-sm"
    );
  });

  it("applies tertiary class when type is tertiary", () => {
    render(<AMPButton name="Click me" type="tertiary" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toHaveClass("text-white", "p-1.5", "px-3", "rounded-sm");
  });

  it("applies none class when type is none", () => {
    render(<AMPButton name="Click me" type="none" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toHaveClass("p-1.5", "px-3");
  });

  it("applies additionalTailwindCss when provided", () => {
    render(<AMPButton name="Click me" additionalTailwindCss="custom-class" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toHaveClass("custom-class");
  });

  it("renders icon if provided", () => {
    render(<AMPButton name="Click me" icon={<MdClose data-testid="icon" />} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders as submit button if isSubmit is true", () => {
    render(<AMPButton name="Submit" isSubmit />);
    const button = screen.getByRole("button", { name: /Submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders as button type if isSubmit is false", () => {
    render(<AMPButton name="Click me" />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies disabled styles when disabled", () => {
    render(<AMPButton name="Click me" disabled />);
    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-35", "cursor-not-allowed");
  });
});
