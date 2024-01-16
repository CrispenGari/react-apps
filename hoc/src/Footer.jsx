import React from "react";
import { withGlobalState } from "./hoc/withGlobalState";

function Footer({ state }) {
  return (
    <div style={{ padding: 10, backgroundColor: "black" }}>
      <p style={{ color: "white" }}>Today: {state.date}</p>
    </div>
  );
}

export default withGlobalState(Footer);
