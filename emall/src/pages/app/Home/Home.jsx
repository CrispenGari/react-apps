import React from "react";
import "./Home.css";
import { useUserStore } from "../../../store";
import Header from "../../../components/Header/Header";

const Home = () => {
  const { user } = useUserStore();
  return (
    <div className="home">
      <Header />
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Home;
