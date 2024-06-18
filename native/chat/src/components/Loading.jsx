import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS, logo } from "../constants";

const Loading = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.main,

        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Image
        source={logo}
        style={{
          marginBottom: 30,
          width: 100,
          height: 100,
        }}
      />

      <Text style={{ letterSpacing: 1, fontWeight: "600" }}>Loading...</Text>
    </View>
  );
};

export default Loading;
