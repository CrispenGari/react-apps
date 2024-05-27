import { View, Text, Image } from "react-native";
import React from "react";
import { logo } from "../../constants";
import { styles } from "../../styles";

const Loading = () => {
  return (
    <View style={[styles.container]}>
      <Image
        source={logo}
        style={{ width: 100, height: 100, marginBottom: 30 }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          letterSpacing: 2,
        }}
      >
        loading...
      </Text>
    </View>
  );
};

export default Loading;
