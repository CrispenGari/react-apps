import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../styles";

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
      <Text style={[styles.h1, { textTransform: "uppercase", fontSize: 16 }]}>
        {label}
      </Text>
      <View style={{ flex: 1, borderBottomWidth: 1 }} />
    </View>
  );
};

export default Divider;
