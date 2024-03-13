import React from "react";
import "./Banner.css";
import Ratting from "../Ratting/Ratting";
const Banner = ({ recipes }) => {
  const [recipe, setRecipe] = React.useState(recipes[0]);
  React.useEffect(() => {
    const id = setInterval(() => {
      const randomIndex = Math.round(Math.random() * 10000) % recipes?.length;
      setRecipe(recipes[randomIndex]);
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [recipes]);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${recipe?.image})`,
      }}
    >
      <h1>{recipe?.name}</h1>
      <Ratting ratting={recipe?.rattings || 0} />
      <p>{recipe?.description}</p>
    </div>
  );
};

export default Banner;
