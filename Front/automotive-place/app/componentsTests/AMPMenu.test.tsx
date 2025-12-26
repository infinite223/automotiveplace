import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AMPMenu, TMenuItem } from "../components/shared/AMPMenu";

jest.mock("framer-motion", () => {
  const MotionUl = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement> & { children?: React.ReactNode }
  >(({ children, ...props }, ref) => (
    <ul ref={ref} {...props}>
      {children}
    </ul>
  ));
  MotionUl.displayName = "MotionUl";

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      ul: MotionUl,
    },
  };
});

describe("AMPMenu component", () => {
  const menuItems: TMenuItem[] = [
    { name: "Item 1", handleClick: jest.fn() },
    { name: "Item 2", handleClick: jest.fn(), isDisable: true },
  ];

  it("renders loading state", () => {
    render(<AMPMenu items={menuItems} isLoading={true} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders menu when icon is clicked", () => {
    render(<AMPMenu items={menuItems} isLoading={false} />);
    const toggle = screen.getByTestId("menu-toggle");
    fireEvent.click(toggle);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("calls handleClick when enabled item is clicked and closes menu", () => {
    render(<AMPMenu items={menuItems} isLoading={false} />);
    const toggle = screen.getByTestId("menu-toggle");
    fireEvent.click(toggle);

    const menuItem = screen.getByText("Item 1");
    fireEvent.click(menuItem);

    expect(menuItems[0].handleClick).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not call handleClick when disabled item is clicked", () => {
    render(<AMPMenu items={menuItems} isLoading={false} />);
    const toggle = screen.getByTestId("menu-toggle");
    fireEvent.click(toggle);

    const menuItem = screen.getByText("Item 2");
    fireEvent.click(menuItem);

    expect(menuItems[1].handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
