import React from "react";

const Colors = ({ colors }) => {
  return (
    <div className="Colors">
      <ul>
        {colors.map((color) => (
          <li key={color}>{color}</li>
        ))}
      </ul>
    </div>
  );
};

export default Colors;
