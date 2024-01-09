import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";
const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app__main">
        <SideBar />
        <Main />
      </div>
    </div>
  );
};

export default App;
