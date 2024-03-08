import React from "react";

const Copy = ({ value }) => {
  const [s, setS] = React.useState("");
  return (
    <div className="Copy">
      <input type="text" value={value} data-testid="copy" />
      <input
        type="text"
        value={s}
        data-testid="paste"
        onPaste={(e) => {
          setS(e.target.value);
        }}
        onChange={(e) => {
          setS(e.target.value);
        }}
      />
    </div>
  );
};

export default Copy;
