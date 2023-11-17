import React from "react";
import "./Header.css";
import { MdFavorite } from "react-icons/md";
const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="header__right">
        <MdFavorite className="header__right--icon" />
        <p>10</p>
      </div>
    </div>
  );
};

export default Header;
