import React from "react";
import { Button, Text, View } from "react-native";

const Register = ({ navigation, route }) => {
  const user = JSON.parse(route.params.user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register {user.name}</Text>
      <Text>{JSON.stringify({ user }, undefined, 2)}</Text>
      <Button title="Login" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Register;
