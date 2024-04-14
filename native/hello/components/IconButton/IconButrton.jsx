import { TouchableOpacity } from "react-native";
const IconButton = ({ onPress, Icon, bg }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        width: 50,
        height: 50,
        backgroundColor: bg,
        borderRadius: 50,
      }}
    >
      {Icon}
    </TouchableOpacity>
  );
};

export default IconButton;
