import React from "react";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import SettingsLanding from "./SettingsLanding";
import Profile from "./Profile";
import ProfileItem from "../../../components/ProfileItem";
import { MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const SettingsDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "Settings",
        drawerActiveBackgroundColor: "red",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            showsVerticalScrollIndicator={true}
            style={{
              flex: 1,
              backgroundColor: "black",
              padding: 0,
              paddingRight: 0,
              paddingTop: 30,
            }}
          >
            {props.state.routes.map((route, index) => {
              if (route.name === "Profile")
                return (
                  <ProfileItem
                    key={index}
                    navigation={props.navigation}
                    index={index}
                    route={route}
                    state={props.state}
                  />
                );
              return null;
            })}
            <DrawerItemList {...props} />
            <DrawerItem
              {...props}
              label={"Hello i am a drwaer item"}
              labelStyle={{ color: "white" }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="SettingsLanding"
        component={SettingsLanding}
        options={{
          drawerLabel: "General",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings-brightness"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default SettingsDrawer;
