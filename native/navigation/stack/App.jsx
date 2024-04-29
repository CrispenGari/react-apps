import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Stack from "./screens/Stack";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack />
      </NavigationContainer>
    </View>
  );
};

export default App;
