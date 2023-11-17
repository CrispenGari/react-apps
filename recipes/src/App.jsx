import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { useRecipes } from "./hooks";
const App = () => {
  const { recipes } = useRecipes();
  return (
    <div className="app">
      <Header />
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
    </div>
  );
};

export default App;
