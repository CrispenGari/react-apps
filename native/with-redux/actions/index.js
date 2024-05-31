import { ACTION_TYPES } from "../constants";

export const addTodo = (todo) => {
  return {
    type: ACTION_TYPES.ADD_TODO,
    value: todo,
  };
};
export const updateTodo = (todo) => {
  return {
    type: ACTION_TYPES.UPDATE_TODO,
    value: todo.id,
  };
};
export const increment = (value) => {
  return {
    type: ACTION_TYPES.INCREMENT,
    value,
  };
};
export const decrement = (value) => {
  return {
    type: ACTION_TYPES.DECREMENT,
    value,
  };
};
