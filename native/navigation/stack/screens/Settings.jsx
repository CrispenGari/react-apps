import React from "react";
import { Button, Text, View, Image } from "react-native";

const Settings = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Image
          source={require("../assets/1.webp")}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 10,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
