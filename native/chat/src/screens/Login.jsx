import {
  View,
  Text,
  StatusBar,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { COLORS, FONTS, logo } from "../constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const Auth = ({ navigation }) => {
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["70%"], []);
  const [form, setForm] = React.useState("login");
  React.useEffect(() => {
    const ev = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.collapse();
    });
    return () => {
      ev.remove();
    };
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ backgroundColor: COLORS.main, flex: 1 }}>
        <StatusBar hidden />
        <View
          style={{
            height: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={logo} style={{ width: 100, height: 100 }} />
          <Text style={{ fontFamily: FONTS.bold, fontSize: 30, marginTop: 10 }}>
            yup 👍!!
          </Text>
        </View>

        <BottomSheet
          backgroundStyle={{ backgroundColor: COLORS.primary }}
          index={0}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          handleComponent={() => (
            <View
              style={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                backgroundColor: COLORS.primary,
                height: 50,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  textTransform: "uppercase",
                  position: "absolute",
                  top: -15,
                  backgroundColor: COLORS.secondary,
                  color: "white",
                  width: 80,
                  textAlign: "center",
                  borderRadius: 999,
                }}
              >
                {form}
              </Text>
            </View>
          )}
        >
          <BottomSheetView
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
            }}
          >
            {form === "login" ? (
              <LoginForm setForm={setForm} />
            ) : (
              <RegisterForm setForm={setForm} />
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Auth;
