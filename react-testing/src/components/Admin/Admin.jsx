import React from "react";

const Admin = ({ role = "user" }) => {
  return (
    <div className="admin">
      {role === "user" ? (
        <h1>You are a regular user!</h1>
      ) : (
        <h1>You are an admin</h1>
      )}
    </div>
  );
};

export default Admin;
