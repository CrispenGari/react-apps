import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.main,
  },
  p: { fontFamily: FONTS.regular, fontSize: 16 },
  h1: { fontFamily: FONTS.bold, fontSize: 20 },
});
