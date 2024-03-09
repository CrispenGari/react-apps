import React from "react";

const Switch = ({ on, off, state }) => {
  return (
    <div className="Switch">
      <h1>{state}</h1>
      {on && <button onClick={on}>ON</button>}
      {off && <button onClick={off}>OFF</button>}
    </div>
  );
};

export default Switch;
