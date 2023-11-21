import { KEYS, store } from "../utils";

export const ACTION_TYPES = {
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
  LIKED: "LIKED",
};
export const initialState = {
  favorites: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LIKE:
      const favs = [action.value, ...state.favorites];
      store(KEYS.FAVORITES, JSON.stringify(favs));
      return { ...state, favorites: favs };
    case ACTION_TYPES.UNLIKE:
      const _favs = state.favorites.filter((f) => f.id !== action.value);
      store(KEYS.FAVORITES, JSON.stringify(_favs));
      return {
        ...state,
        favorites: _favs,
      };
    case ACTION_TYPES.LIKED:
      return {
        ...state,
        favorites: action.value,
      };
    default:
      return state;
  }
};
