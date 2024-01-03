import { constants } from "../constants";

export const countReducer = (state = 0, action) => {
  switch (action.type) {
    case constants.increment:
      return (state = state + action.value);
    case constants.decrement:
      return (state = state - action.value);
    case constants.reset:
      return (state = 0);
    default:
      return state;
  }
};
