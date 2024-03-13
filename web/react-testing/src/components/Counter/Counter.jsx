import React from "react";

const Counter = ({ value = 0 }) => {
  const [count, setCount] = React.useState(value);
  const [amount, setAmount] = React.useState(value);

  const increment = () => setCount(count + parseInt(amount));
  const decrement = () => setCount(count - parseInt(amount));
  return (
    <div className="Counter">
      <h1>{count}</h1>
      <input
        type="text"
        placeholder="Enter increment amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export default Counter;
