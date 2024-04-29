import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Profile"
          screenOptions={{
            tabBarStyle: {
              height: 80,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <Ionicons
                  name="home"
                  size={size}
                  color={focused ? "#153448" : "#DFD0B8"}
                />
              ),
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={{
                      color: focused ? "#153448" : "#DFD0B8",
                      marginBottom: 5,
                    }}
                  >
                    Home
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <View
                  style={{
                    backgroundColor: focused ? "#153448" : "white",
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 25,
                    borderRadius: 100,
                    borderColor: "gray",
                    borderWidth: StyleSheet.hairlineWidth,
                    shadowRadius: 10,
                    shadowColor: "red",
                    shadowOpacity: 0.7,
                    shadowOffset: { width: 5, height: 5 },
                    elevation: 1,
                  }}
                >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                    }}
                    source={require("./assets/cat.webp")}
                  />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarBadge: "9+",
              tabBarBadgeStyle: {
                backgroundColor: "#153448",
                width: 30,
                height: 30,
                borderRadius: 30,
                padding: 5,
              },

              tabBarIcon: ({ focused, size }) => (
                <Ionicons
                  name="settings"
                  size={size}
                  color={focused ? "#153448" : "#DFD0B8"}
                />
              ),
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={{
                      color: focused ? "#153448" : "#DFD0B8",
                      marginBottom: 5,
                    }}
                  >
                    Settings
                  </Text>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Home Screen</Text>
    </View>
  );
};
const Profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Profile Screen</Text>
    </View>
  );
};
const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Settings Screen</Text>
    </View>
  );
};
