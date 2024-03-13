import React from "react";
import "./Ratting.css";
import { IoStarSharp, IoStarOutline } from "react-icons/io5";

const Ratting = ({ ratting }) => {
  const left = 5 - ratting;

  return (
    <div className="ratting">
      {Array(ratting)
        .fill(true)
        .map((_, index) => (
          <IoStarSharp key={index} className="ratting__star" />
        ))}
      {Array(left)
        .fill(true)
        .map((_, index) => (
          <IoStarOutline key={index} className="ratting__star" />
        ))}
    </div>
  );
};

export default Ratting;
