import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { COLORS } from "../constants";
export const schedulePushNotification = async ({
  title,
  body,
  data,
  badge,
  subtitle,
}) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      badge,
      color: COLORS.primary,
      subtitle,
    },
    trigger: { seconds: 2 },
  });
};

export const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const retrieve = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const del = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
