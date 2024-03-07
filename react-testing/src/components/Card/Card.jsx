import React from "react";

const Card = ({ user }) => {
  return (
    <div className="Card">
      <h1>{user.fullName}</h1>
      <h2>{user.email}</h2>
      <img src={user.avatar} alt={user.nickname + " avatar"} />
    </div>
  );
};

export default Card;
