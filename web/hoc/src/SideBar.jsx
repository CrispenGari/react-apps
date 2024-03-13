import React from "react";
import { withPeople } from "./hoc/withPeople";

const SideBar = ({ state }) => {
  if (state.fetching) {
    return <p>Fetching people</p>;
  }
  return (
    <div className="SideBar">
      {state.people.map((p) => (
        <h1>{p.email}</h1>
      ))}
    </div>
  );
};

export default withPeople(SideBar);
