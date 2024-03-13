import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import Counter from "./Counter";

describe("<Counter/>", () => {
  it("renders correctly with the initial count of 10", () => {
    render(<Counter value={10} />);
    const h1 = screen.getByRole("heading", { name: "10" });
    expect(h1).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter increment amount");
    expect(input).toBeInTheDocument();
    const btn1 = screen.getByRole("button", { name: "increment" });
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByRole("button", { name: "decrement" });
    expect(btn2).toBeInTheDocument();
  });

  it("renders increments from 5 by 10", async () => {
    render(<Counter value={5} />);
    const input = screen.getByPlaceholderText("Enter increment amount");
    const increment = screen.getByRole("button", { name: "increment" });
    await waitFor(async () => {
      await user.clear(input);
      await user.type(input, "10");
      await user.click(increment);
    });

    const h1 = screen.getByRole("heading", { name: "15" });
    expect(h1).toBeInTheDocument();
  });
  it("renders decrement from 10 by 2", async () => {
    render(<Counter value={10} />);
    const input = screen.getByPlaceholderText("Enter increment amount");
    const decrement = screen.getByRole("button", { name: "decrement" });
    await waitFor(async () => {
      await user.clear(input);
      await user.type(input, "2");
      await user.click(decrement);
    });
    const h1 = screen.getByRole("heading", { name: "8" });
    expect(h1).toBeInTheDocument();
  });
});
