import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";
import { useQuery } from "react-query";
const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: async (params) => {
      const res = await fetch("http://localhost:3001/all");
      const people = await res.json();
      return {
        people,
      };
    },
  });
  return (
    <div className="app">
      <Header />
      <div className="app__main">
        <SideBar data={data} isFetching={isLoading} />
        <Main data={data} isFetching={isLoading} />
      </div>
    </div>
  );
};

export default App;
