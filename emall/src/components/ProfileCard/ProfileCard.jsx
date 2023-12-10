import React from "react";
import { useUserStore } from "../../store";
import { Avatar } from "@mui/material";
import "./ProfileCard.css";
const ProfileCard = () => {
  const { user } = useUserStore();

  return (
    <div className="profile__card">
      <h2>Welcome to your profile!!</h2>
      <Avatar
        title={user?.displayName || user?.email}
        alt={user?.displayName || user?.email}
        src={user?.photoURL}
        className="profile__card__avatar"
      />
    </div>
  );
};

export default ProfileCard;
