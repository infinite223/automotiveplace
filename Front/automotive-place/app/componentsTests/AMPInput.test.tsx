import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AMPInput } from "../components/shared/AMPInput";
import React from "react";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockValidFunction = (value: string | number) => {
  if (String(value).length < 3) {
    return [{ error: "Value is too short", valid: false }];
  }
  return [];
};

describe("AMPInput component", () => {
  it("renders input with label", () => {
    render(<AMPInput name="Title" value="" setValue={jest.fn()} />);

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  it("calls setValue when user types", async () => {
    const user = userEvent.setup();
    const setValue = jest.fn();

    render(<AMPInput name="Title" value="" setValue={setValue} />);

    const input = screen.getByLabelText("Title");
    await user.type(input, "abc");

    expect(setValue).toHaveBeenCalled();
  });

  it("does not show validation error before blur", async () => {
    const user = userEvent.setup();

    render(
      <AMPInput
        name="Title"
        value=""
        setValue={jest.fn()}
        validFunction={mockValidFunction}
      />
    );

    const input = screen.getByLabelText("Title");
    await user.type(input, "a");

    expect(screen.queryByText("Value is too short")).not.toBeInTheDocument();
  });

  it("shows validation error after blur", async () => {
    const user = userEvent.setup();

    render(
      <AMPInput
        name="Title"
        value="a"
        setValue={jest.fn()}
        validFunction={mockValidFunction}
      />
    );

    const input = screen.getByLabelText("Title");
    await user.click(input);
    await user.tab();

    expect(screen.getByText("Value is too short")).toBeInTheDocument();
  });

  it("shows error from props after blur", async () => {
    const user = userEvent.setup();

    render(
      <AMPInput
        name="Title"
        value=""
        setValue={jest.fn()}
        error="Server validation error"
      />
    );

    const input = screen.getByLabelText("Title");
    await user.click(input);
    await user.tab();

    expect(screen.getByText("Server validation error")).toBeInTheDocument();
  });
});
