import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { COLORS } from "../../constants";

const SettingItem = ({ onPress, Icon, label }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: COLORS.primary,
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {Icon}
      <Text style={[styles.p]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SettingItem;
