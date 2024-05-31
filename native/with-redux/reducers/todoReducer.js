import { ACTION_TYPES } from "../constants";

export const todoReduce = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return (state = [action.value, ...state]);
    case ACTION_TYPES.UPDATE_TODO:
      return (state = state.map((t) => {
        if (t.id === action.value) {
          return { ...t, done: !t.done };
        }
        return t;
      }));
    default:
      return state;
  }
};
