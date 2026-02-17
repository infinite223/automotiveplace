import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AMPImageZoomModal from "../components/shared/AMPImageZoomModal";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt="img-test" />;
  },
}));

jest.mock("../components/shared/AMPModal", () => ({
  __esModule: true,
  default: ({ children, visible }: any) =>
    visible ? <div data-testid="modal">{children}</div> : null,
}));

const images = ["/img-1.jpg", "/img-2.jpg", "/img-3.jpg"];

describe("AMPImageZoomModal component", () => {
  it("renders modal when visible is true", () => {
    render(
      <AMPImageZoomModal
        images={images}
        currentIndex={0}
        visible
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("does not render modal when visible is false", () => {
    render(
      <AMPImageZoomModal
        images={images}
        currentIndex={0}
        visible={false}
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("renders current image", () => {
    render(
      <AMPImageZoomModal
        images={images}
        currentIndex={1}
        visible
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    const img = screen.getByAltText("img-test") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/img-2.jpg");
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <AMPImageZoomModal
        images={images}
        currentIndex={0}
        visible
        onClose={onClose}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    const closeButton = screen.getAllByRole("button")[0];

    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows navigation buttons when there are multiple images", () => {
    render(
      <AMPImageZoomModal
        images={images}
        currentIndex={0}
        visible
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");

    // close + prev + next
    expect(buttons.length).toBe(3);
  });

  it("does not show navigation buttons when there is only one image", () => {
    render(
      <AMPImageZoomModal
        images={["/single.jpg"]}
        currentIndex={0}
        visible
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");

    // only close button
    expect(buttons.length).toBe(1);
  });

  it("calls onPrev and onNext when navigation buttons are clicked", async () => {
    const user = userEvent.setup();
    const onPrev = jest.fn();
    const onNext = jest.fn();

    render(
      <AMPImageZoomModal
        images={images}
        currentIndex={1}
        visible
        onClose={jest.fn()}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const buttons = screen.getAllByRole("button");

    const prevButton = buttons[1];
    const nextButton = buttons[2];

    await user.click(prevButton);
    await user.click(nextButton);

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
