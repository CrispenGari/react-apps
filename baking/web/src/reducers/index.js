import { combineReducers } from "redux";
import { bookmarkReducer } from "./bookmarkReducer";

export const rootReducers = combineReducers({
  bookmarks: bookmarkReducer,
});
