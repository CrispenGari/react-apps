import { render, screen } from "@testing-library/react";
import Admin from "./Admin";

describe("<Admin/>", () => {
  test("renders correctly with role user", () => {
    render(<Admin />);
    const h1 = screen.getByText("You are a regular user!");
    expect(h1).toBeInTheDocument();
  });
  test("renders correctly with role admin", () => {
    render(<Admin role="admin" />);
    const h1 = screen.getByText("You are an admin");
    expect(h1).toBeInTheDocument();
  });
});
