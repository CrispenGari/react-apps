export const ACTION_TYPES = {
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
};
export const initialState = {
  favorites: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LIKE:
      return { ...state, favorites: [action.value, ...state.favorites] };
    case ACTION_TYPES.UNLIKE:
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.value),
      };
    default:
      return state;
  }
};
