import { combineReducers } from "redux";
import { countReducer } from "./countReducer";
import { userReducer } from "./userReducer";

export const rootReducers = combineReducers({
  count: countReducer,
  user: userReducer,
});
