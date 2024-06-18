import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Divider from "../Divider/Divider";
import { COLORS, FONTS, IMAGES } from "../../constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const LoginForm = ({ setForm }) => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const loginWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((res) => {
        setState({ email: "", password: "", error: "" });
      })
      .catch((error) =>
        setState((state) => ({ ...state, error: error.message }))
      );
  };
  const loginWithGitHub = () => {};
  const loginWithGoogle = () => {};
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <BottomSheetTextInput
        value={state.email}
        onChangeText={(text) =>
          setState((state) => ({ ...state, email: text }))
        }
        placeholder="Email address"
        keyboardType="email-address"
        style={{
          backgroundColor: COLORS.main,
          fontFamily: FONTS.regular,
          padding: 10,
          fontSize: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          marginBottom: 5,
        }}
      />
      <BottomSheetTextInput
        placeholder="Password"
        keyboardType="default"
        style={{
          backgroundColor: COLORS.main,
          fontFamily: FONTS.regular,
          padding: 10,
          fontSize: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        value={state.password}
        onChangeText={(text) =>
          setState((state) => ({ ...state, password: text }))
        }
        secureTextEntry={true}
        onSubmitEditing={loginWithEmailAndPassword}
      />
      <Text
        style={{
          fontSize: 18,
          fontFamily: FONTS.regular,
          color: "red",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        {state.error}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.tertiary,
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={loginWithEmailAndPassword}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            color: "white",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <Divider label={"Or login with"} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.main,
            borderRadius: 40,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={IMAGES.google}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: "#010508",
            borderRadius: 40,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="logo-github" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <SafeAreaView
        style={{
          padding: 25,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            color: COLORS.tertiary,
            position: "absolute",
            bottom: 0,
            fontFamily: FONTS.regular,
            fontSize: 18,
            textDecorationLine: "underline",
          }}
          onPress={() => setForm("register")}
        >
          Create Account.
        </Text>
      </SafeAreaView>
    </View>
  );
};
export default LoginForm;
