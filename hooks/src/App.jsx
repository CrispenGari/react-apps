import React from "react";
import { useData, useDebounce } from "./hooks";

const App = () => {
  const data = useData({ id: 2, category: "users" });
  const [searchTerm, setSearchTerm] = React.useState("");
  const deboundeTerm = useDebounce(searchTerm, 2000);
  return (
    <div>
      <p>You typed: {deboundeTerm}</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
