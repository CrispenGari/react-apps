import { ACTION_TYPES } from "../constants";

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case ACTION_TYPES.INCREMENT:
      return (state = state + action.value);
    case ACTION_TYPES.DECREMENT:
      return (state = state - action.value);
    default:
      return state;
  }
};
