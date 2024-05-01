import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Callout, Marker } from "react-native-maps";
import { useLocationPermision } from "./useLocationPermision";
import React from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
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

// const Home = () => {
//   const { granted } = useLocationPermision();
//   const [me, setMe] = React.useState({});

//   React.useEffect(() => {
//     (async () => {
//       if (granted) {
//         const {
//           coords: { latitude, longitude },
//         } = await Location.getCurrentPositionAsync();
//         setMe({
//           latitude,
//           longitude,
//         });

//         console.log({ me });
//       }
//     })();
//   }, [granted]);
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <MapView
//         style={{ flex: 1, width: "100%" }}
//         provider="google"
//         showsUserLocation={true}
//         zoomTapEnabled={true}
//         initialRegion={{
//           ...me,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         mapType="standard"
//       >
//         <Callout>
//           <Marker coordinate={{ ...me }} />
//         </Callout>
//       </MapView>
//     </View>
//   );
// };
const Profile = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader navigation={navigation} route={route} />,
    });
  }, [navigation, route]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Profile Screen</Text>
    </View>
  );
};
const Home = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader navigation={navigation} route={route} />,
    });
  }, [navigation, route]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Home Screen</Text>
    </View>
  );
};
const Settings = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader navigation={navigation} route={route} isSettings />
      ),
    });
  }, [navigation, route]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Settings Screen</Text>
    </View>
  );
};

const HomeHeader = ({ navigation, route, isSettings }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: 40,
        paddingBottom: 5,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBlockColor: "gray",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/1.webp")}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 10,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>{route.name}</Text>
        {isSettings ? (
          <View style={{ width: 50, marginHorizontal: 10 }} />
        ) : (
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
            }}
            onPress={() =>
              navigation.navigate("Settings", {
                me: JSON.stringify({ id: 10, username: "john" }),
              })
            }
          >
            <Ionicons name="settings" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 10,
          gap: 10,
          marginTop: 10,
        }}
      >
        <Ionicons size={30} name="search" />
        <TextInput placeholder="Search Friends..." />
      </View>
    </View>
  );
};
