import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppTabs from "./app";
import AuthStack from "./auth";

const Routes = () => {
  const user = {};
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
