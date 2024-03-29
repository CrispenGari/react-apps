import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import React from "react";

const Button = ({ title, onPress, color, btnStyles, titleStyles }) => {
  const bgStyles =
    color === "primary"
      ? {
          backgroundColor: "#7AA2E3",
        }
      : color === "secondary"
      ? {
          backgroundColor: "#A1C398",
        }
      : color === "tertiary"
      ? {
          backgroundColor: "#6AD4DD",
        }
      : {};

  return (
    <TouchableOpacity
      style={[
        {
          width: "100%",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FA7070",
          borderRadius: 5,
        },
        bgStyles,
        btnStyles,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={[{ color: "white", fontSize: 20 }, titleStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "default",
    undefined,
  ]),
  btnStyles: PropTypes.object,
  titleStyles: PropTypes.object,
};

export default Button;
