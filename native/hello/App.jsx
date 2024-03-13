import { registerRootComponent } from "expo";
import {
  StyleSheet,
  View,
  StatusBar,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
const App = () => {
  const [name, setName] = React.useState("");
  const hi = () => {
    Alert.alert("New message", `Hello ${name}!`, [
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          setName("");
        },
      },
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  };
  return (
    <View style={{ ...styles.container }}>
      <StatusBar barStyle={"dark-content"} />
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
      />
      <Button title="Say Hello" onPress={hi} />
    </View>
  );
};
registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
