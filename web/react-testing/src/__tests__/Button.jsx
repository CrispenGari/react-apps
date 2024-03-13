import { render, screen } from "@testing-library/react";
import Button from "../components/Button/Button";

describe("<Button/>", () => {
  test("renders correctly", () => {
    render(<Button title={"Hello"} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});
