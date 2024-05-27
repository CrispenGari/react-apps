export const ACTION_TYPES = {
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
  ALL: "ALL",
  SETTINGS: "SETTINGS",
};
export const initialState = {
  favorites: [],
  settings: {
    theme: "light",
    sound: true,
    vibration: true,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SETTINGS:
      return {
        ...state,
        settings: action.value,
      };
    case ACTION_TYPES.LIKE:
      const favs = [action.value, ...state.favorites];
      return { ...state, favorites: favs };
    case ACTION_TYPES.UNLIKE:
      const _favs = state.favorites.filter((f) => f.id !== action.value);
      return {
        ...state,
        favorites: _favs,
      };
    case ACTION_TYPES.ALL:
      return {
        ...state,
        favorites: action.value,
      };
    default:
      return state;
  }
};
