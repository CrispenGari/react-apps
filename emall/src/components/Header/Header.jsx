import React from "react";
import "./Header.css";
import { Avatar, Button } from "@mui/material";
import { useUserStore } from "../../store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const Header = () => {
  const { user } = useUserStore();
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="header">
      <div className="header__left">
        <img alt="logo" src="/logo.png" />
      </div>
      <div className="header__right">
        <Button onClick={logout}>Logout</Button>
        <Avatar
          title={user?.displayName || user?.email}
          alt={user?.displayName || user?.email}
          src={user?.photoURL}
          className="header__right__avatar"
        />
      </div>
    </div>
  );
};

export default Header;
