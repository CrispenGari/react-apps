import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Todo from "./Todo";
import "./App.css";
import { all, create } from "./api";

const App = () => {
  const client = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: all,
  });
  const mutateAdd = useMutation({
    mutationFn: create,
  });
  const [title, setTitle] = React.useState("");
  const add = (e) => {
    e.preventDefault();
    mutateAdd.mutate(
      { title },
      {
        onSuccess: (data) => {
          client.invalidateQueries(["todos"]);
          setTitle("");
        },
      }
    );
  };
  if (isFetching) return <p>Fetching Todos....</p>;
  return (
    <div className="app">
      <h1>All Todos</h1>
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="Todo title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
      <div className="app__todos">
        {data.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default App;
