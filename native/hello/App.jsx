import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { style } from "./App.style";
import Button from "./components/Button/Button";
import Divider from "./components/Divider/Divider";
import LazyImage from "./components/LazyImage/LazyImage";
import CustomTextInput from "./components/CustomTextInput/CustomTextInput";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const App = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    phoneNumber: "",
    conf: "",
    username: "",
    showPassword: false,
    showConf: false,
  });

  return (
    <View style={style.app}>
      <CustomTextInput
        value={state.email}
        onChangeText={(text) => setState((s) => ({ ...s, email: text }))}
        placeholder={"Enter email"}
        leftIcon={<MaterialIcons name="email" size={24} color="black" />}
      />
      <CustomTextInput
        value={state.phoneNumber}
        keyboardType={"phone-pad"}
        onChangeText={(text) => setState((s) => ({ ...s, phoneNumber: text }))}
        placeholder={"Phone Number"}
        leftIcon={
          <MaterialCommunityIcons name="phone" size={24} color="black" />
        }
      />
      <CustomTextInput
        placeholder={"Password"}
        onChangeText={(text) => setState((s) => ({ ...s, password: text }))}
        leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
        rightButton={
          <TouchableOpacity
            onPress={() =>
              setState((s) => ({
                ...s,
                showPassword: !s.showPassword,
              }))
            }
          >
            {state.showPassword ? (
              <MaterialCommunityIcons name="eye-off" size={24} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="eye-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        }
        secureTextEntry={!state.showPassword}
      />
      <CustomTextInput
        placeholder={"Confirm password"}
        onChangeText={(text) => setState((s) => ({ ...s, conf: text }))}
        leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
        rightButton={
          <TouchableOpacity
            onPress={() =>
              setState((s) => ({
                ...s,
                showConf: !s.showConf,
              }))
            }
          >
            {state.showConf ? (
              <MaterialCommunityIcons name="eye-off" size={24} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="eye-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        }
        secureTextEntry={!state.showConf}
      />
      {/* <Text style={style.h1}>Cat</Text>

      <LazyImage
        uri={
          "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
        }
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          marginVertical: 10,
        }}
      />
      <Button
        title={"Default"}
        onPress={() => console.log("You pressed me!")}
      />
      <Divider
        color={"gray"}
        title={"Already have a account?"}
        titlePosition={"left"}
      />
      <Divider
        color={"red"}
        title={"Already have a account?"}
        titlePosition={"center"}
      />
      <Divider
        color={"gray"}
        title={"Already have a account?"}
        titlePosition={"right"}
      />
      <Button
        color={"secondary"}
        title={"Secondary"}
        onPress={() => console.log("You pressed me!")}
        titleStyles={{ color: "black" }}
        btnStyles={{ maxWidth: 200, marginVertical: 10, borderRadius: 10 }}
      />
      <Button
        color={"tertiary"}
        title={"Tertiary"}
        onPress={() => console.log("You pressed me!")}
      />
      <Button
        color={"primary"}
        title={"Primary"}
        onPress={() => console.log("You pressed me!")}
      /> */}
    </View>
  );
};
export default App;
