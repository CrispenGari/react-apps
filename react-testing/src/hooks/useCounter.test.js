import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("renders with the correct initial state of 10", () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialValue: 10 },
    });
    expect(result.current.count).toBe(10);
  });
  it("increments correctly", () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialValue: 0 },
    });
    act(() => result.current.increment(5));
    expect(result.current.count).toBe(5);
  });
  it("decrements correctly", () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialValue: 10 },
    });
    act(() => result.current.decrement(5));
    expect(result.current.count).toBe(5);
  });
});
