import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../../screens/auth/Landing";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
