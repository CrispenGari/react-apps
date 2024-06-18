import { View, Text, Alert, TextInput } from "react-native";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMeStore } from "../store";
import { COLORS, FONTS } from "../constants";
import { db } from "../firebase";

const Create = ({ navigation }) => {
  const { me } = useMeStore();

  const [state, setState] = React.useState({ channel: "" });

  const create = () => {
    if (state.channel.trim().length < 3) {
      return Alert.alert(
        "Yup",
        "The channel name must contain at least 3 characters."
      );
    }
    addDoc(collection(db, "channels"), {
      name: state.channel,
      owner: {
        email: me.email,
        uid: me?.uid,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((ref) => {
        if (ref.id) {
          setState({ channel: "" });
          navigation.goBack();
        }
      })
      .catch((error) => console.log(error));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create New Channel",

      headerStyle: {
        height: 80,
        backgroundColor: COLORS.primary,
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: COLORS.main }}>
      <TextInput
        value={state.channel}
        onChangeText={(text) =>
          setState((state) => ({ ...state, channel: text }))
        }
        placeholder="Channel Name"
        keyboardType="default"
        style={{
          backgroundColor: "white",
          fontFamily: FONTS.regular,
          padding: 10,
          fontSize: 20,
          marginBottom: 5,
          borderRadius: 10,
        }}
        onSubmitEditing={create}
      />
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.tertiary,
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 250,
        }}
        onPress={create}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            color: "white",
          }}
        >
          CREATE CHANNEL
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Create;
