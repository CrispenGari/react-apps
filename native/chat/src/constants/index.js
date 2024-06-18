export const logo = require("../../assets/icon.png");
export const IMAGES = {
  google: require("../../assets/google.png"),
};

export const COLORS = {
  main: "#EEEEEE",
  primary: "#D1D8C5",
  secondary: "#7E8EF1",
  tertiary: "#615EFC",
};

export const Fonts = {
  regular: require("../../assets/fonts/Mukta-Regular.ttf"),
  bold: require("../../assets/fonts/Mukta-Bold.ttf"),
};

export const FONTS = {
  bold: "bold",
  regular: "regular",
};

export const KEYS = {
  CHANNELS: ":channels:",
  MESSAGES: (id) => `:messages:${id}:`,
  LAST_MESSAGE: (id) => `:last_message:${id}:`,
};

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};
