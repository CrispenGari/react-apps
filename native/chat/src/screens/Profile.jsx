import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, relativeTimeObject } from "../constants";
import Avatar from "../components/Avatar";
import { useMeStore } from "../store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { useOs } from "../hooks/useOs";
import { Ionicons } from "@expo/vector-icons";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const Profile = ({ navigation }) => {
  const { me } = useMeStore();
  const logout = () => signOut(auth);
  const { os } = useOs();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerStyle: {
        height: os === "ios" ? 100 : 80,
        backgroundColor: COLORS.primary,
      },

      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.main,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: FONTS.regular,

          color: "gray",
        }}
      >
        JOINED {dayjs(new Date(Number(me.metadata.createdAt))).fromNow()} ago
      </Text>
      <Avatar size={150} alt={me.email} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.bold,
          marginVertical: 20,
        }}
      >
        {me.email}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.tertiary,
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: 300,
          position: "absolute",
          bottom: 30,
        }}
        onPress={logout}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            color: "white",
          }}
        >
          logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
