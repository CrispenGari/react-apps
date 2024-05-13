import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Create from "../../screens/app/Create";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "../../screens/app/home";
import SettingsDrawer from "../../screens/app/settings";
const Tab = createBottomTabNavigator();
const AppTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Settings"
      screenOptions={{ tabBarStyle: { height: 80 } }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="fast-food-outline" size={size} color={color} />
          ),
          title: "Recipes",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsDrawer}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
