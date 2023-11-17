export const initialState = {
  user: null,
  count: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "decrement":
      return { ...state, count: state.count - action.value };
    case "increment":
      return { ...state, count: state.count + action.value };
    case "login":
      return {
        ...state,
        user: action.value,
      };
    case "logout":
      return {
        ...state,
        user: action.value,
      };
    default:
      return state;
  }
};
