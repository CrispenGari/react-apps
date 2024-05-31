import { combineReducers } from "redux";
import { todoReduce } from "./todoReducer";
import { counterReducer } from "./counterReducer";

export const reducers = combineReducers({
  todo: todoReduce,
  counter: counterReducer,
});
