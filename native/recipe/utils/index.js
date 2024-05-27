import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

export const onImpact = async () =>
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const onImpactSound = async () => {
  const { sound: s, status } = await Audio.Sound.createAsync(
    require("../assets/sounds/app.mp3"),
    {
      shouldPlay: true,
      isLooping: false,
      isMuted: false,
      volume: 1,
    }
  );
  if (status.isLoaded) {
    sound = s;
  }
  if (!!sound) {
    await sound.playAsync().catch((err) => console.log(err));
  }
};

export const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};
export const retrive = async (key) => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res;
  } catch (error) {
    return null;
  }
};

// store all the recipes []
