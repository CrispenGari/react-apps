import React from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = ({ navigation, route }) => {
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
          source={require("../assets/1.webp")}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 10,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>{route.name}</Text>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
          }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings" size={24} />
        </TouchableOpacity>
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

const Home = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => <HomeHeader {...props} />,
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home </Text>
    </View>
  );
};

export default Home;
