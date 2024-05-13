import { View, Text, Button } from "react-native";
import React from "react";

const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to our app!!</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default Landing;
