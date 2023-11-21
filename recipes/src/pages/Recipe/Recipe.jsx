import React from "react";
import "./Recipe.css";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useRecipe } from "../../hooks";
import Ratting from "../../components/Ratting/Ratting";
const Recipe = () => {
  const params = useParams();
  const { recipe } = useRecipe({ id: params.recipeId });

  if (Object.keys(recipe).length === 0) return <p>No Recipe</p>;
  return (
    <div className="recipe__page">
      <Header />
      <div className="recipe__page__recipes">
        <div className="recipe__page__recipe__left">
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          <img alt={recipe.name} src={recipe.image} />
          <Ratting ratting={recipe.rattings} />
          <p>
            By {recipe.author} • Serves {recipe.serves} people •{" "}
            {recipe.difficult}
          </p>
          <Link to={recipe.url}>Read More</Link>
        </div>

        <div className="recipe__page__recipe__right">
          <h2>{recipe.subcategory}</h2>
          <h1>Ingredients</h1>
          {recipe.ingredients?.map((ing, i) => (
            <p key={i}> ✔ {ing}</p>
          ))}

          <h1>Times</h1>
          {Object.entries(recipe.times).map(([key, value], index) => (
            <p key={index}>
              🔛 <span>{key}: </span>
              <span>{value}</span>
            </p>
          ))}

          <h1>Preparation Steps</h1>
          {recipe.steps?.map((ing, i) => (
            <p key={i}>✔ {ing}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
