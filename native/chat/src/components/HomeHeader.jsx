import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { COLORS, FONTS, logo } from "../constants";
import { Ionicons } from "@expo/vector-icons";

import { useMeStore } from "../store";

const HomeHeader = ({ navigation }) => {
  const { me } = useMeStore();
  return (
    <>
      <SafeAreaView
        style={{
          height: 100,
          backgroundColor: COLORS.primary,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={logo}
          style={{
            width: 40,
            height: 40,
            marginLeft: 10,
          }}
        />
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 20,
          }}
        >
          Channels
        </Text>

        <View
          style={{
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.tertiary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
            onPress={() => navigation.navigate("create")}
          >
            <Ionicons name="create" size={24} color={"white"} />
          </TouchableOpacity>
          <Avatar
            onPress={() => navigation.navigate("profile")}
            alt={me.email}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeHeader;
