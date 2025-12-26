import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AMPButton } from "../components/shared/AMPButton";

describe("AMPButton component", () => {
  it("renders button with text", () => {
    render(<AMPButton name="Click me" />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<AMPButton name="Click me" onClick={onClick} />);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<AMPButton name="Disabled" onClick={onClick} disabled />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders submit type when isSubmit is true", () => {
    render(<AMPButton name="Submit" isSubmit />);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders button type by default when isSubmit is false", () => {
    render(<AMPButton name="Normal" />);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
  });

  it("applies correct class for primary type", () => {
    render(<AMPButton name="Primary" type="primary" />);

    const button = screen.getByRole("button");

    expect(button.className).toContain("bg-amp-500");
  });

  it("applies correct class for secondary type", () => {
    render(<AMPButton name="Secondary" type="secondary" />);

    const button = screen.getByRole("button");

    expect(button.className).toContain("bg-amp-300");
  });

  it("renders icon when icon prop is provided", () => {
    render(
      <AMPButton name="With icon" icon={<span data-testid="icon">⭐</span>} />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders icon without text correctly", () => {
    render(<AMPButton icon={<span data-testid="icon">⭐</span>} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies additionalTailwindCss", () => {
    render(<AMPButton name="Styled" additionalTailwindCss="test-class" />);

    const button = screen.getByRole("button");

    expect(button.className).toContain("test-class");
  });
});
