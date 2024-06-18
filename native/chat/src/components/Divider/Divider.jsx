import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";

const Divider = ({ label }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text style={{ fontFamily: FONTS.bold, fontSize: 16 }}>{label}</Text>
      <View
        style={{ flex: 1, borderBottomWidth: 1, borderColor: COLORS.tertiary }}
      />
    </View>
  );
};

export default Divider;
