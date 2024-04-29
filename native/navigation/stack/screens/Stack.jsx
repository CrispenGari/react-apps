import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Settings from "./Settings";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: {
          textAlign: "center",
        },
        headerStyle: {
          height: 150,
          borderBottomColor: "red",
          borderBottomWidth: 2,
        },
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default () => {
  const [user, setUser] = React.useState({
    me: "me",
  });
  return user ? <AppStack /> : <AuthStack />;
};

// AppStack
// AuthStack
