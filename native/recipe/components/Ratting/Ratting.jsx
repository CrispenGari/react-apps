import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const Ratting = ({ value }) => {
  const unfilled = Math.floor(5 - value);
  const filled = Math.floor(value);

  return (
    <View
      style={{
        gap: 3,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      {Array(filled)
        .fill(filled)
        .map((_, index) => (
          <Ionicons name="star" key={index} size={24} color={COLORS.rating} />
        ))}

      {Array(unfilled)
        .fill(unfilled)
        .map((_, index) => (
          <Ionicons
            key={index}
            name="star-outline"
            size={24}
            color={COLORS.rating}
          />
        ))}
    </View>
  );
};

export default Ratting;
