import { render, screen } from "@testing-library/react";
import Switch from "./Switch";
import user from "@testing-library/user-event";

describe("<Switch/>", () => {
  it("renders correctly with the ON state", () => {
    render(<Switch state={"ON"} off={() => {}} on={() => {}} />);
    expect(screen.getByRole("button", { name: "ON" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ON", level: 1 })
    ).toBeInTheDocument();
  });
  it("renders correctly with the OFF state", () => {
    render(<Switch state={"OFF"} off={() => {}} on={() => {}} />);
    expect(screen.getByRole("button", { name: "OFF" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "OFF", level: 1 })
    ).toBeInTheDocument();
  });

  it("run the on function", () => {
    const onHandler = jest.fn();
    render(<Switch state={"ON"} on={onHandler} />);
    user.click(screen.getByRole("button", { name: "ON" }));
    expect(onHandler).toHaveBeenCalledTimes(1);
  });
  it("run the off function", () => {
    const offHandler = jest.fn();
    render(<Switch state={"OFF"} off={offHandler} />);
    user.click(screen.getByRole("button", { name: "OFF" }));
    expect(offHandler).toHaveBeenCalledTimes(1);
  });
});
