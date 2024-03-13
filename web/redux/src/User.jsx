import React from "react";
import { useSelector } from "react-redux";
const User = () => {
  const user = useSelector((state) => state.user);
  if (!!!user) return <p>You are not logged in</p>;
  return (
    <div className="user">
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p> You are {new Date().getFullYear() - user.dob} years old.</p>
      <p>Gender: {user.gender}</p>
    </div>
  );
};

export default User;
