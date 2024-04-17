import { View, Text, Button, FlatList } from "react-native";
import React from "react";

import Typography from "./components/Typography/Typography";
import { useFonts } from "expo-font";
import { Fonts } from "./constants";
import { Statements, db, run } from "./db";
import Form from "./components/Form/Form";
import IconButton from "./components/IconButton/IconButrton";
import Student from "./components/Student/Student";
import { FontAwesome } from "@expo/vector-icons";

const App = () => {
  const [loaded] = useFonts(Fonts);
  const [students, setStudents] = React.useState([]);
  const [student, setStudent] = React.useState(null);
  const [order, setOrder] = React.useState("ASC");

  React.useEffect(() => {
    (async () => {
      const { result } = await run({
        sql: Statements.CREATE_TABLE_STATEMENT,
        args: [],
      });
    })();

    // (async () => {
    //   await db.transaction(
    //     (txt) => {
    //       txt.executeSql(Statements.CREATE_TABLE_STATEMENT);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     async () => {
    //       console.log("The table student has been synced");
    //       await db.transaction(
    //         (txt) => {
    //           txt.executeSql(
    //             Statements.ALL_STUDENTS,
    //             undefined,
    //             (_, { rows }) => {
    //               if (rows._array.length !== 0) {
    //                 setStudents(rows._array);
    //               }
    //             },
    //             (error) => console.error(error)
    //           );
    //         },
    //         (error) => {
    //           console.log(error);
    //         },
    //         () => {
    //           console.log("The table student has been synced");
    //         }
    //       );
    //     }
    //   );
    // })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const { result } = await run({
        sql: Statements.ALL_STUDENTS.concat(order).concat(";"),
        args: [],
      });
      const stds = result[0].rows;
      setStudents(stds);
    })();
  }, [order]);

  if (!loaded)
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text> Loading...</Text>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginTop: 20,
      }}
    >
      <Form
        setStudents={setStudents}
        student={student}
        setStudent={setStudent}
        order={order}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginVertical: 10,
        }}
      >
        <Typography variant={"h1"}>All Students</Typography>

        <IconButton
          Icon={<FontAwesome name="unsorted" size={24} color="black" />}
          bg={"#f5f5f5"}
          onPress={() => setOrder((oder) => (order === "ASC" ? "DESC" : "ASC"))}
        />
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={students}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <Student
              setStudents={setStudents}
              setStudent={setStudent}
              student={item}
              order={order}
            />
          )}
          style={{ flex: 0 }}
        />
      </View>
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
