import { render, screen } from "@testing-library/react";
import Colors from "./Colors";

describe("<Colors/>", () => {
  it("Renders correctly", () => {
    render(<Colors colors={[]} />);
    const ul = screen.getByRole("list");
    expect(ul).toBeInTheDocument();
  });
  it("contains 3 colors", () => {
    const colors = ["red", "blue", "green"];
    render(<Colors colors={colors} />);
    const li = screen.getAllByRole("listitem");
    expect(li.length).toEqual(colors.length);
  });
});
