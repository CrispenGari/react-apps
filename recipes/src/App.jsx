import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { useRecipes } from "./hooks";
import Recipe from "./components/Recipe/Recipe";
import Banner from "./components/Banner/Banner";
const App = () => {
  const { recipes } = useRecipes();
  return (
    <div className="app">
      <Header />
      <Banner recipes={recipes} />
      <div className="app__recipes">
        {recipes.slice(0).map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default App;
