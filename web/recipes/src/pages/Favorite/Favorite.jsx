import React from "react";
import "./Favorite.css";
import Header from "../../components/Header/Header";
import { useGlobalState } from "../../Context";
import Recipe from "../../components/Recipe/Recipe";
import Banner from "../../components/Banner/Banner";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [{ favorites }] = useGlobalState();

  if (favorites?.length === 0) {
    return (
      <div className="favorite">
        <Header />
        <div className="favorite__no">
          <h1>You don't have favorite Recipes at the moment!</h1>
          <Link to={"/"}>Explore Recipes</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="favorite">
      <Header />
      <Banner recipes={favorites} />
      <div className="favorite__recipes">
        {favorites.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
