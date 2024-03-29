import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const Divider = ({ title, color, titlePosition }) => {
  return (
    <View
      style={{
        flexDirection: titlePosition === "left" ? "row-reverse" : "row",
        marginVertical: 10,
        alignItems: "center",
      }}
    >
      {titlePosition === "center" ? (
        <>
          <View style={{ flex: 1, borderColor: color, borderBottomWidth: 1 }} />
          <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{title}</Text>
          <View style={{ flex: 1, borderColor: color, borderBottomWidth: 1 }} />
        </>
      ) : (
        <>
          <View style={{ flex: 1, borderColor: color, borderBottomWidth: 1 }} />
          <Text
            style={{
              fontSize: 18,
              marginLeft: titlePosition === "left" ? 0 : 10,
              marginRight: titlePosition === "right" ? 0 : 10,
            }}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );
};

Divider.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  titlePosition: PropTypes.oneOf(["left", "right", "center"]),
};

export default Divider;
