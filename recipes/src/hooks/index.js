import React from "react";
import { axios } from "../axios";

export const useRecipes = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get("/recipes").then((res) => setData(res.data));
  }, []);
  return {
    recipes: data,
  };
};
