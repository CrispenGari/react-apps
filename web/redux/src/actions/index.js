import { constants } from "../constants";

export const login = (user) => {
  return {
    value: user,
    type: constants.login,
  };
};
export const register = (user) => {
  return {
    value: user,
    type: constants.register,
  };
};
export const logout = () => {
  return {
    type: constants.logout,
  };
};

export const increment = (value) => {
  return {
    value,
    type: constants.increment,
  };
};
export const decrement = (value) => {
  return {
    value,
    type: constants.decrement,
  };
};
export const reset = () => {
  return {
    type: constants.reset,
  };
};
