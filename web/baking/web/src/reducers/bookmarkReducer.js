import { constants } from "../constants";

export const bookmarkReducer = (state = [], action) => {
  switch (action.type) {
    case constants.add:
      return (state = [action.value, ...state]);
    case constants.remove:
      return (state = state.filter((r) => r.id !== action.value));
    case constants.clear:
      return (state = []);
    default:
      return state;
  }
};
