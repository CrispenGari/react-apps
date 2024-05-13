import { View, Text, ScrollView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
const SettingsLanding = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Divider label={"User Preference"} />

      <SettingItem
        label={"Dark"}
        onPress={() => {}}
        Icon={
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color="black"
          />
        }
      />
      <SettingItem
        label={"In app sound"}
        onPress={() => {}}
        Icon={<Ionicons name="volume-low" size={24} color="black" />}
      />
      <Divider label={"Account"} />
      <SettingItem
        label={"Delete Account"}
        onPress={() => {}}
        Icon={<MaterialIcons name="delete-outline" size={24} color="black" />}
      />
      <Divider label={"Issues & Bugs"} />

      <SettingItem
        label={"Github"}
        onPress={() => {}}
        Icon={<Ionicons name="logo-github" size={24} color="black" />}
      />
    </ScrollView>
  );
};

export default SettingsLanding;

const SettingItem = ({ Icon, label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: "white",
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {Icon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const Divider = ({ label }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {label}
      </Text>
      <View style={{ flex: 1, borderBottomWidth: 1 }} />
    </View>
  );
};
