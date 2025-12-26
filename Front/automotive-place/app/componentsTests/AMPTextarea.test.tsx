import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TValidResult } from "@/app/utils/types";
import { AMPTextarea } from "../components/shared/AMPTextarea";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockValidFunction = (value: string | number) => {
  if (String(value).length < 3) {
    return [{ error: "Value is too short", valid: false }];
  }
  return [];
};

describe("AMPTextarea component", () => {
  it("renders textarea with label", () => {
    render(<AMPTextarea name="Description" value="" setValue={jest.fn()} />);

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls setValue when user types", async () => {
    const user = userEvent.setup();
    const setValue = jest.fn();

    render(<AMPTextarea name="Description" value="" setValue={setValue} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");

    expect(setValue).toHaveBeenCalled();
    expect(setValue).toHaveBeenCalledTimes(5);
  });

  it("does not show validation error before blur", async () => {
    const user = userEvent.setup();

    render(
      <AMPTextarea
        name="Description"
        value=""
        setValue={jest.fn()}
        validFunction={mockValidFunction}
      />
    );

    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "a");

    expect(screen.queryByText("Value is too short")).not.toBeInTheDocument();
  });

  it("shows validation error after blur", async () => {
    const user = userEvent.setup();

    render(
      <AMPTextarea
        name="Description"
        value=""
        setValue={jest.fn()}
        validFunction={mockValidFunction}
      />
    );

    const textarea = screen.getByRole("textbox");

    await user.click(textarea);
    await user.tab(); // blur

    expect(screen.getByText("Value is too short")).toBeInTheDocument();
  });

  it("shows error from props after blur", async () => {
    const user = userEvent.setup();

    render(
      <AMPTextarea
        name="Description"
        value=""
        setValue={jest.fn()}
        error="Server error"
      />
    );

    const textarea = screen.getByRole("textbox");

    await user.click(textarea);
    await user.tab(); // blur

    expect(screen.getByText("Server error")).toBeInTheDocument();
  });
});
