import { getFullName } from "./getFullName";

describe("getFullName", () => {
  it("give us the correct full name", () => {
    const user = { firstName: "John", lastName: "Doe" };
    const fullName = getFullName(user.firstName, user.lastName);
    expect(fullName).toEqual("John Doe");
  });
});
