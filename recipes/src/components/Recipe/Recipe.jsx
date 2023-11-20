import React from "react";
import "./Recipe.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Ratting from "../Ratting/Ratting";
import { useGlobalState } from "../../Context";
import { ACTION_TYPES } from "../../reducers";
const Recipe = ({ recipe }) => {
  const [{ favorites }, dispatch] = useGlobalState();
  const [liked, setLiked] = React.useState(false);
  const like = () => {
    dispatch({
      type: ACTION_TYPES.LIKE,
      value: recipe,
    });
  };
  const unlike = () => {
    dispatch({
      type: ACTION_TYPES.UNLIKE,
      value: recipe?.id,
    });
  };

  React.useEffect(() => {
    setLiked(!!favorites.find((r) => r.id === recipe.id));
  }, [favorites, recipe]);

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
            onClick={unlike}
            className="recipe__controls__like__button"
          />
        ) : (
          <MdFavoriteBorder
            onClick={like}
            className="recipe__controls__like__button"
          />
        )}
      </div>

      {/* buttons */}
    </div>
  );
};

export default Recipe;
