import React from "react";
import "./Recipe.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Ratting from "../Ratting/Ratting";
const Recipe = ({ recipe }) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <div className="recipe">
      <h1>{recipe.name}</h1>
      <p>
        {recipe.author} • {recipe.difficult} • {recipe.author} • serves{" "}
        {recipe.serves} people
      </p>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>

      <div className="recipe__controls">
        <Ratting ratting={recipe.rattings} />
        {liked ? (
          <MdFavorite
            onClick={() => setLiked(false)}
            className="recipe__controls__like__button"
          />
        ) : (
          <MdFavoriteBorder
            onClick={() => setLiked(true)}
            className="recipe__controls__like__button"
          />
        )}
      </div>

      {/* buttons */}
    </div>
  );
};

export default Recipe;
