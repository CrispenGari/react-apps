import React from "react";

export const useCounter = ({ initialValue }) => {
  const [count, setCount] = React.useState(initialValue);
  const increment = (value) => setCount((state) => state + value);
  const decrement = (value) => setCount((state) => state - value);
  return {
    count,
    increment,
    decrement,
  };
};
