import PropTypes from "prop-types";
import { View, Text, TextInput } from "react-native";
import React from "react";

const CustomTextInput = ({
  placeholder,
  leftIcon,
  rightButton,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      {leftIcon}
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingVertical: 5,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      />
      {rightButton}
    </View>
  );
};
CustomTextInput.propTypes = {
  placeholder: PropTypes.string,
};

export default CustomTextInput;
