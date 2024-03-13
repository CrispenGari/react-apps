import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages";
import { useGlobalState } from "./Context";
import { ACTION_TYPES } from "./reducers";
import { KEYS, retrieve } from "./utils";
const router = createBrowserRouter([{ path: "*", Component: Root }]);
const App = () => {
  const [, dispatch] = useGlobalState();
  React.useLayoutEffect(() => {
    retrieve(KEYS.FAVORITES).then((res) => {
      if (!!!res) {
        dispatch({ type: ACTION_TYPES.LIKED, value: [] });
      } else {
        dispatch({ type: ACTION_TYPES.LIKED, value: JSON.parse(res) });
      }
    });
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

export default App;
