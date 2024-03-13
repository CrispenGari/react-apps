import React from "react";
import "./Header.css";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../Context";
const Header = () => {
  const navigation = useNavigate();
  const [{ favorites }] = useGlobalState();

  return (
    <div className="header">
      <div className="header__left">
        <img src="/logo.png" alt="logo" onClick={() => navigation("/")} />
      </div>
      <div className="header__right">
        <div
          className="header__right__button"
          onClick={() => navigation("/favorites")}
        >
          <MdFavorite className="header__right--icon" />
          {favorites?.length ? <p>{favorites.length}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
