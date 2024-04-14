import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

export const onImpact = async () => await Haptics.impactAsync();
export const onNotification = async () => await Haptics.notificationAsync();
export const onSelection = async () => await Haptics.selectionAsync();
export const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};
export const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return value;
  } catch (error) {
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
