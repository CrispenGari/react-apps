import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";

const Avatar = ({ alt, onPress = () => {}, size = 50 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: size,
        backgroundColor: COLORS.secondary,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: size / 2,
          color: "white",
          textTransform: "uppercase",
        }}
      >
        {alt[0]}
      </Text>
    </TouchableOpacity>
  );
};

export default Avatar;
