import "react-native-gesture-handler";
import { StatusBar, Text, View } from "react-native";
import React from "react";
import Routes from "./routes";

const App = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Routes />
    </>
  );
};

export default App;

// Home (tab) - [Post] -> Post Detail
// -> Profile

/*
Setting (tab)
    - logout
    - delete acoount
        - Conf
*/
