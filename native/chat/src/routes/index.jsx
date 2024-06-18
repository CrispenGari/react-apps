import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chat";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { useMeStore } from "../store";
import { useFonts } from "expo-font";
import { Fonts } from "../constants";
import Loading from "../components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Profile from "../screens/Profile";
import Create from "../screens/Create";

const Stack = createStackNavigator();
const Routes = () => {
  const { me, login, logout } = useMeStore();
  const [loaded] = useFonts(Fonts);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
    });
    return () => unsubscribe();
  }, []);

  if (!loaded) return <Loading />;

  return (
    <NavigationContainer>
      {me ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="create" component={Create} />
    </Stack.Navigator>
  );
};
