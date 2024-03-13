import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { add, remove } from "./actions";
const App = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["recipes"],
    queryFn: async (params) => {
      const res = await fetch("http://localhost:8000/");
      const data = await res.json();
      return data;
    },
  });
  const bookmarks = useSelector((state) => state.bookmarks);
  if (isFetching) return <p>Fetching recipes</p>;
  return (
    <div className="app">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Logo</h1>
        <h2>{bookmarks.length} bookmarks</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default App;

const Recipe = ({ recipe }) => {
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const addToBookMark = () => {
    dispatch(add(recipe));
  };
  const removeToBookMark = () => {
    dispatch(remove(recipe.id));
  };
  return (
    <div style={{ width: 300, margin: 5 }}>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} width={200} />
      <br />
      {!!bookmarks.find((re) => re.id === recipe.id) ? (
        <button onClick={removeToBookMark}>Remove from Bookmark</button>
      ) : (
        <button onClick={addToBookMark}>Add to Bookmark</button>
      )}
    </div>
  );
};
