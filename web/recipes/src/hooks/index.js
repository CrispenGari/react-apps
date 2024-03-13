import { recipes } from "../data/recipes";

export const useRecipes = () => {
  return {
    recipes,
  };
};

export const useRecipe = ({ id }) => {
  const recipe = recipes.find((r) => r.id === id);
  return {
    recipe,
  };
};
