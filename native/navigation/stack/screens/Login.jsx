import React from "react";
import { Button, Text, View } from "react-native";

const Login = ({ navigation, route }) => {
  const user = {
    name: "John Doe",
    avatar: "doe.jpg",
    email: "johndoe@gmail.com",
    id: 1,
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <Button
        title="Register"
        onPress={() =>
          navigation.navigate("Register", { user: JSON.stringify(user) })
        }
      />
    </View>
  );
};

export default Login;
