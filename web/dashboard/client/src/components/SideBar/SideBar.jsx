import React from "react";
import "./SideBar.css";
import Person from "../Person/Person";

const SideBar = ({ data, isFetching }) => {
  if (isFetching)
    return (
      <div className="sidebar">
        <p>Loading people</p>
      </div>
    );
  return (
    <div className="sidebar">
      {data?.people?.map((person) => (
        <Person key={person._id} person={person} />
      ))}
    </div>
  );
};

export default SideBar;
