import React from "react";

export const AppCxt = React.createContext();

export const AppProvider = ({ reducer, initialState, children }) => {
  return (
    <AppCxt.Provider value={React.useReducer(reducer, initialState)}>
      {children}
    </AppCxt.Provider>
  );
};

export const useGlobalState = () => React.useContext(AppCxt);
