import { constants } from "../constants";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case constants.logout:
      return (state = null);
    case constants.register:
    case constants.login:
      return (state = action.value);
    default:
      return state;
  }
};
