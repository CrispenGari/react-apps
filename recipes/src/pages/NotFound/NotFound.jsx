import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not__found">
      <img src="/logo.png" alt="logo" />
      <h1>
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </h1>
      <p>Opps! Page Not Found</p>
      <div className="not__found__links">
        <Link to={"/"}>Home</Link> | <Link to={"/favorites"}>Favorites</Link>
      </div>
    </div>
  );
};

export default NotFound;
