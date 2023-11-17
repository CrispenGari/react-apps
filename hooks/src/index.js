import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./Context";
import { initialState, reducer } from "./reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider reducer={reducer} initialState={initialState}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
