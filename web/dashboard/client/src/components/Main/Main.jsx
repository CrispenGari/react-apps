import React from "react";
import "./Main.css";

import { CSpinner } from "@coreui/react";

import Gender from "../Gender/Gender";
import Month from "../Month/Month";
const Main = ({ isFetching, data }) => {
  if (isFetching)
    return (
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CSpinner />
      </div>
    );
  return (
    <div className="main">
      <div className="main__row">
        <Gender data={data.people} type={"bar"} color={"cornflowerblue"} />
        <Gender data={data.people} type={"line"} color={"red"} />
      </div>
      <div className="main__row">
        <Month data={data.people} type={"bar"} />
        <Month data={data.people} type={"line"} />
      </div>
    </div>
  );
};

export default Main;
