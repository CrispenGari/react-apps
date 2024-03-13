import React from "react";
import { withPeople } from "./hoc/withPeople";

const Main = ({ state }) => {
  if (state.fetching) {
    return <p>Fetching people</p>;
  }
  return (
    <div className="Main">
      {state.people.map((p) => (
        <h1>{p.email}</h1>
      ))}
    </div>
  );
};

export default withPeople(Main);
