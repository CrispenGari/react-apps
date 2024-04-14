import { View, Text, Image, Pressable, TextInput, Button } from "react-native";
import React from "react";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Typography from "./components/Typography/Typography";
import { useFonts } from "expo-font";
import { Fonts } from "./constants";
import * as ImagePicker from "expo-image-picker";
import IconButton from "./components/IconButton/IconButrton";
import { useImagePermisions } from "./hooks/imagePermisions";
import * as Sharing from "expo-sharing";
import * as Network from "expo-network";
import NetInfo from "@react-native-community/netinfo";
import { LinearGradient } from "expo-linear-gradient";
import * as DC from "expo-document-picker";

const App = () => {
  const [loaded] = useFonts(Fonts);

  const select = async () => {
    const { assets } = await DC.getDocumentAsync({
      multiple: false,
      copyToCacheDirectory: true,
    });

    console.log({ assets });
  };

  if (!loaded)
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text> Loading...</Text>
      </View>
    );

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 10,
      }}
    >
      <Button title="Select documnet" onPress={select} />
      <Typography variant={"h1"}>Set Profile</Typography>
    </View>
  );
};

export default App;
// const App = () => {
//   const [loaded] = useFonts(Fonts);
//   const [image, setImage] = React.useState(null);

//   const permisions = useImagePermisions();

//   const gallery = async () => {
//     if (permisions.gallery) {
//       const { assets } = await ImagePicker.launchImageLibraryAsync({
//         allowsEditing: true,
//         allowsMultipleSelection: false,
//         aspect: [1, 1],
//         quality: 1,
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       });
//       if (assets) {
//         const { uri } = assets[0];
//         setImage(uri);
//       }
//     }
//   };
//   const camera = async () => {
//     if (permisions.camera) {
//       const { assets } = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         allowsMultipleSelection: false,
//         aspect: [1, 1],
//         quality: 1,
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       });
//       if (assets) {
//         const { uri } = assets[0];
//         setImage(uri);
//       }
//     }
//   };

//   const share = async () => {
//     await Sharing.shareAsync(image, {
//       dialogTitle: "Sharing Your Profile",
//     });
//   };

//   if (!loaded)
//     return (
//       <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//         <Text> Loading...</Text>
//       </View>
//     );

//   return (
//     <View
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//         flex: 1,
//         padding: 10,
//       }}
//     >
//       <Typography variant={"h1"}>Set Profile</Typography>
//       <Image
//         style={{
//           width: 150,
//           height: 150,
//           borderRadius: 150,
//           marginTop: 10,
//         }}
//         source={{
//           uri: image
//             ? image
//             : Image.resolveAssetSource(require("./assets/profile.jpg")).uri,
//         }}
//       />
//       <View
//         style={{
//           marginVertical: 10,
//           flexDirection: "row",
//           padding: 20,
//           borderWidth: 1,
//           width: "100%",
//           justifyContent: "center",
//           borderRadius: 10,
//         }}
//       >
//         <IconButton
//           Icon={<FontAwesome5 name="camera" size={24} color="white" />}
//           bg={"black"}
//           onPress={camera}
//         />
//         <IconButton
//           Icon={<AntDesign name="picture" size={24} color="white" />}
//           bg={"cornflowerblue"}
//           onPress={gallery}
//         />
//         {image && (
//           <IconButton
//             Icon={<AntDesign name="sharealt" size={24} color="white" />}
//             bg={"blue"}
//             onPress={share}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default App;

// const App = () => {
//   const [state, setState] = React.useState({
//     email: "",
//     password: "",
//     phoneNumber: "",
//     conf: "",
//     username: "",
//     showPassword: false,
//     showConf: false,
//   });

//   return (
//     <View style={style.app}>
//       <CustomTextInput
//         value={state.email}
//         onChangeText={(text) => setState((s) => ({ ...s, email: text }))}
//         placeholder={"Enter email"}
//         leftIcon={<MaterialIcons name="email" size={24} color="black" />}
//       />
//       <CustomTextInput
//         value={state.phoneNumber}
//         keyboardType={"phone-pad"}
//         onChangeText={(text) => setState((s) => ({ ...s, phoneNumber: text }))}
//         placeholder={"Phone Number"}
//         leftIcon={
//           <MaterialCommunityIcons name="phone" size={24} color="black" />
//         }
//       />
//       <CustomTextInput
//         placeholder={"Password"}
//         onChangeText={(text) => setState((s) => ({ ...s, password: text }))}
//         leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
//         rightButton={
//           <TouchableOpacity
//             onPress={() =>
//               setState((s) => ({
//                 ...s,
//                 showPassword: !s.showPassword,
//               }))
//             }
//           >
//             {state.showPassword ? (
//               <MaterialCommunityIcons name="eye-off" size={24} color="black" />
//             ) : (
//               <MaterialCommunityIcons
//                 name="eye-outline"
//                 size={24}
//                 color="black"
//               />
//             )}
//           </TouchableOpacity>
//         }
//         secureTextEntry={!state.showPassword}
//       />
//       <CustomTextInput
//         placeholder={"Confirm password"}
//         onChangeText={(text) => setState((s) => ({ ...s, conf: text }))}
//         leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
//         rightButton={
//           <TouchableOpacity
//             onPress={() =>
//               setState((s) => ({
//                 ...s,
//                 showConf: !s.showConf,
//               }))
//             }
//           >
//             {state.showConf ? (
//               <MaterialCommunityIcons name="eye-off" size={24} color="black" />
//             ) : (
//               <MaterialCommunityIcons
//                 name="eye-outline"
//                 size={24}
//                 color="black"
//               />
//             )}
//           </TouchableOpacity>
//         }
//         secureTextEntry={!state.showConf}
//       />
//       {/* <Text style={style.h1}>Cat</Text>

//       <LazyImage
//         uri={
//           "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
//         }
//         style={{
//           width: 200,
//           height: 200,
//           alignSelf: "center",
//           marginVertical: 10,
//         }}
//       />
//       <Button
//         title={"Default"}
//         onPress={() => console.log("You pressed me!")}
//       />
//       <Divider
//         color={"gray"}
//         title={"Already have a account?"}
//         titlePosition={"left"}
//       />
//       <Divider
//         color={"red"}
//         title={"Already have a account?"}
//         titlePosition={"center"}
//       />
//       <Divider
//         color={"gray"}
//         title={"Already have a account?"}
//         titlePosition={"right"}
//       />
//       <Button
//         color={"secondary"}
//         title={"Secondary"}
//         onPress={() => console.log("You pressed me!")}
//         titleStyles={{ color: "black" }}
//         btnStyles={{ maxWidth: 200, marginVertical: 10, borderRadius: 10 }}
//       />
//       <Button
//         color={"tertiary"}
//         title={"Tertiary"}
//         onPress={() => console.log("You pressed me!")}
//       />
//       <Button
//         color={"primary"}
//         title={"Primary"}
//         onPress={() => console.log("You pressed me!")}
//       /> */}
//     </View>
//   );
// };
// export default App;
