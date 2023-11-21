import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import { useRecipes } from "../../hooks";
import Recipe from "../../components/Recipe/Recipe";
const Home = () => {
  const { recipes } = useRecipes();
  return (
    <div className="home">
      <Header />
      <Banner recipes={recipes} />
      <div className="home__recipes">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
