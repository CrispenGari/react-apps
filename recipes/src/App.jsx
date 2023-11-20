import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages";
const router = createBrowserRouter([{ path: "*", Component: Root }]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
