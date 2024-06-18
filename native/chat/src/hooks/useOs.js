import { Platform } from "react-native";
export const useOs = () => {
  return {
    os: Platform.OS,
  };
};
