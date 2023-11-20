import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Favorite from "./Favorite/Favorite";
import NotFound from "./NotFound/NotFound";

const Root = () => {
  return (
    <Routes>
      <Route path="/" caseSensitive element={<Home />} />
      <Route path="/favorites" caseSensitive element={<Favorite />} />
      <Route path="*" element={<NotFound />} caseSensitive />
    </Routes>
  );
};

export default Root;
