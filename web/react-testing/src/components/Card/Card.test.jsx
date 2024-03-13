import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("<Card/>", () => {
  it("renders card correctly card of Jonh", () => {
    const user = {
      fullName: "John Doe",
      nickname: "john",
      email: "johndoe@gmail.com",
      avatar: "john.jpg",
    };
    render(<Card user={user} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const img = screen.getByAltText(`${user.nickname} avatar`);
    expect(img).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });

  it("renders card correctly card of Bob", () => {
    const user = {
      fullName: "Bob Doe",
      nickname: "bob",
      email: "bobdoe@gmail.com",
      avatar: "bob.jpg",
    };
    render(<Card user={user} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const img = screen.getByAltText(`${user.nickname} avatar`);
    expect(img).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});
