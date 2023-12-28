import React from "react";
import { useQuery } from "react-query";

const App = () => {
  const [id, setId] = React.useState("1");
  return (
    <div>
      <input
        type="number"
        min={1}
        max={200}
        value={id}
        defaultValue={1}
        placeholder="Enter Todo Id"
        onChange={(e) => setId(e.target.value)}
      />
      <Todo id={id} />
    </div>
  );
};

export default App;

const Todo = ({ id }) => {
  const { data, isFetching, error, isLoading } = useQuery({
    queryKey: ["todo", id],
    queryFn: async (val) => {
      const [, _id] = val.queryKey;
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${_id}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <pre>
        <code>
          {JSON.stringify({ data, isFetching, error, isLoading }, null, 2)}
        </code>
      </pre>
    </div>
  );
};
