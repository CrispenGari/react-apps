import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import Copy from "./Copy";

describe("<Copy/>", () => {
  test("renders correctly inputs", () => {
    render(<Copy value={"Hello there"} />);
    expect(screen.getByTestId("copy")).toBeInTheDocument();
    expect(screen.getByTestId("paste")).toBeInTheDocument();
  });

  test("renders copies correctly and paste to another input", async () => {
    const str = "Hello there";
    render(<Copy value={str} />);
    const copy = screen.getByTestId("copy");
    const paste = screen.getByTestId("paste");
    await waitFor(async () => {
      await user.type(copy, "Hello there", {
        initialSelectionStart: 0,
        initialSelectionEnd: str.length - 1,
      });
      await user.paste(paste, str);
    });
    expect(screen.getAllByDisplayValue(str).length).toBe(2);
  });
});
