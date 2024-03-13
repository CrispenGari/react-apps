import { render, screen } from "@testing-library/react";
import App from "./App";

test("it should render a the text that we want", async () => {
  render(<App />);
  const h1 = screen.getAllByText("testing react app.");
  const p = screen.queryByText("hello");
  const span = await screen.findByText("Hello", {}, { timeout: 2000 });
  expect(h1.length).toEqual(2);
  expect(p).not.toBeInTheDocument();
  expect(span).toBeInTheDocument();
});
