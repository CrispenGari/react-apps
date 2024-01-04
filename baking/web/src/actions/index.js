import { constants } from "../constants";

export const add = (recipe) => ({ type: constants.add, value: recipe });
export const remove = (id) => {
  return { type: constants.remove, value: id };
};
export const clear = () => ({ type: constants.clear });
