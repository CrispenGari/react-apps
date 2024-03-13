import React from "react";
import "./Header.css";
import { Avatar, Badge, Button, IconButton } from "@mui/material";
import { useCartStore, useUserStore } from "../../store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user } = useUserStore();
  const { products } = useCartStore();

  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="header">
      <div className="header__left">
        <img alt="logo" src="/logo.png" onClick={() => navigate("/")} />
      </div>
      <div className="header__right">
        <Button onClick={logout}>Logout</Button>
        <Avatar
          title={user?.displayName || user?.email}
          alt={user?.displayName || user?.email}
          src={user?.photoURL}
          className="header__right__avatar"
          onClick={() => navigate("/profile")}
        />
        <Badge badgeContent={products.length} color="primary" max={9}>
          <IconButton onClick={() => navigate("/cart")}>
            <GiShoppingCart />
          </IconButton>
        </Badge>
      </div>
    </div>
  );
};

export default Header;
