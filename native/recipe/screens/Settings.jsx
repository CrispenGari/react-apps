import { Linking, ScrollView, Text, View, Alert } from "react-native";
import React from "react";

import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import SettingItem from "../components/SettingItem/SettingItem";
import Divider from "../components/Divider/Divider";
import { COLORS, KEYS } from "../constants";
import Constants from "expo-constants";
import { styles } from "../styles";
import { ACTION_TYPES } from "../reducers";
import { onImpact, onImpactSound, store } from "../utils";
import { useGlobalState } from "../Context";
const Settings = () => {
  const [{ settings }, dispatch] = useGlobalState();

  const clearFavourites = async () => {
    if (settings.vibration) {
      await onImpact();
    }
    if (settings.sound) {
      await onImpactSound();
    }

    Alert.alert(
      Constants.expoConfig.name,
      "Are you sure you want to delete all your favorite recipe?",
      [
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            if (settings.vibration) {
              await onImpact();
            }
            if (settings.sound) {
              await onImpactSound();
            }
            // empty the state
            dispatch({
              type: ACTION_TYPES.ALL,
              value: [],
            });
            // delete from async storage
            await store(KEYS.FAVOURITE, JSON.stringify([]));
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.main }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.main }}>
        <Divider label={"User Preference"} />
        <SettingItem
          label={settings.theme}
          onPress={async () => {
            if (settings.vibration) {
              await onImpact();
            }
            if (settings.sound) {
              await onImpactSound();
            }
          }}
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
          onPress={async () => {
            if (settings.vibration) {
              await onImpact();
            }
            if (settings.sound) {
              await onImpactSound();
            }
            const newSettings = {
              ...settings,
              sound: !settings.sound,
            };
            dispatch({
              type: ACTION_TYPES.SETTINGS,
              value: newSettings,
            });

            await store(KEYS.SETTINGS, JSON.stringify(newSettings));
          }}
          Icon={
            <Ionicons
              name={settings.sound ? "volume-low" : "volume-mute"}
              size={24}
              color="black"
            />
          }
        />
        <SettingItem
          label={"In app vibration"}
          onPress={async () => {
            if (settings.vibration) {
              await onImpact();
            }
            if (settings.sound) {
              await onImpactSound();
            }
            const newSettings = {
              ...settings,
              vibration: !settings.vibration,
            };
            dispatch({
              type: ACTION_TYPES.SETTINGS,
              value: newSettings,
            });

            await store(KEYS.SETTINGS, JSON.stringify(newSettings));
          }}
          Icon={
            <MaterialCommunityIcons
              name={settings.vibration ? "vibrate" : "vibrate-off"}
              size={24}
              color="black"
            />
          }
        />
        <Divider label={"Storage Management"} />
        <SettingItem
          label={"Clear Favourites"}
          onPress={clearFavourites}
          Icon={<MaterialIcons name="clear-all" size={24} color="black" />}
        />
        <Divider label={"Issues & Bugs"} />

        <SettingItem
          label={"Github"}
          onPress={async () => {
            if (settings.vibration) {
              await onImpact();
            }
            if (settings.sound) {
              await onImpactSound();
            }
            Linking.openURL("http://github.com/crispengari/react-apps/issues");
          }}
          Icon={<Ionicons name="logo-github" size={24} color="black" />}
        />
      </ScrollView>
      <Text
        style={[
          styles.p,
          { padding: 20, alignSelf: "center", color: COLORS.green },
        ]}
      >
        {Constants.expoConfig.name} {Constants.expoConfig.version}
      </Text>
    </View>
  );
};

export default Settings;
