import { TouchableOpacity, Text, Image, View } from "react-native";

const ProfileItem = ({ navigation, route, index, state }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate(route.name)}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: state.index === index ? "red" : "black",
          alignItems: "center",
          paddingVertical: 100,
        }}
      >
        <Text style={{ color: "white" }}>John Doe</Text>
        <Image
          source={require("../assets/cat.webp")}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          style={{
            padding: 20,
            width: "100%",
            backgroundColor: "cornflowerblue",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          marginVertical: 30,
        }}
      />
    </>
  );
};

export default ProfileItem;
