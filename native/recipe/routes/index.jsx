import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Recipes from "../screens/Recipes";
import Favorites from "../screens/Favorites";
import Settings from "../screens/Settings";
import { COLORS, KEYS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";
import { retrive } from "../utils";
import { useGlobalState } from "../Context";
import { ACTION_TYPES } from "../reducers";

const Tab = createMaterialTopTabNavigator();
const Routes = () => {
  const [, dispatch] = useGlobalState();

  React.useEffect(() => {
    (async () => {
      const res = await retrive(KEYS.FAVOURITE);
      const res2 = await retrive(KEYS.SETTINGS);
      const fav = res ? JSON.parse(res) : [];
      if (res2) {
        dispatch({ type: ACTION_TYPES.SETTINGS, value: JSON.parse(res2) });
      }
      dispatch({
        type: ACTION_TYPES.ALL,
        value: fav,
      });
    })();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Recipes"
        screenOptions={{
          tabBarStyle: {
            height: 120,
            backgroundColor: COLORS.primary,
            justifyContent: "flex-end",
          },
          tabBarLabelStyle: [styles.p, { textTransform: "lowercase" }],
          tabBarIndicatorStyle: { backgroundColor: COLORS.green, height: 4 },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Recipes"
          component={Recipes}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="fast-food" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" size={24} color={color} />
            ),
          }}
          component={Favorites}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
