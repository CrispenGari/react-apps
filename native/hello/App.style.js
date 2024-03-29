import { StyleSheet, PixelRatio } from "react-native";

export const style = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    padding: 10,
  },
  avatar: {
    width: PixelRatio.getPixelSizeForLayoutSize(100),
    height: PixelRatio.getPixelSizeForLayoutSize(100),
    borderRadius: 100,
  },
  h1: {
    fontWeight: "600",
    fontSize: 25,
  },
});
