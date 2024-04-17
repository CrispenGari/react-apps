import React from "react";
import { View, Text, Alert } from "react-native";
import Typography from "../Typography/Typography";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import Button from "../Button/Button";
import { Statements, db, run } from "../../db";

const Form = ({ setStudents, setStudent, student, order }) => {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    avatar: "",
    bio: "",
  });

  React.useEffect(() => {
    if (student) {
      setState({
        firstName: student.firstName,
        lastName: student.lastName,
        avatar: student.avatar,
        bio: student.bio,
      });
    }
  }, [student]);

  const update = async () => {
    if (state.firstName.trim().length < 3 || state.lastName.trim().length < 3) {
      return Alert.alert(
        "Error",
        "First Name and last Name must contain at least 3 characters."
      );
    }

    const { result } = await run({
      args: state.bio
        ? [state.firstName, state.lastName, state.avatar, state.bio, student.id]
        : [state.firstName, state.lastName, state.avatar, student.id],

      sql: Statements.UPDATE_STUDENT(state.bio),
    });
    if (result[0].rowsAffected) {
      setState({ firstName: "", lastName: "", avatar: "", bio: "" });
      setStudent(null);
      Alert.alert("Student Updated", "Student has been updated!!.");
      const { result } = await run({
        sql: Statements.ALL_STUDENTS.concat(order).concat(";"),
        args: [],
      });
      const stds = result[0].rows;
      setStudents(stds);
    }
    // db.transaction(
    //   (txt) => {
    //     txt.executeSql(Statements.UPDATE_STUDENT, [
    //       state.firstName,
    //       state.lastName,
    //       state.avatar,
    //       state.bio,
    //       student.id,
    //     ]);
    //   },
    //   (error) => {
    //     Alert.alert("Error", error.message);
    //   },
    //   async () => {
    //     setState({ firstName: "", lastName: "", avatar: "", bio: "" });
    //     setStudent(null);
    //     await db.transaction((txt) => {
    //       txt.executeSql(
    //         Statements.ALL_STUDENTS.concat(order).concat(";"),
    //         undefined,
    //         (_, { rows }) => {
    //           if (rows._array.length !== 0) {
    //             setStudents(rows._array);
    //           }
    //         },
    //         (error) => console.error(error)
    //       );
    //     });
    //     return Alert.alert("Student Updated", "Student has been updated!!.");
    //   }
    // );
  };
  const add = async () => {
    if (state.firstName.trim().length < 3 || state.lastName.trim().length < 3) {
      return Alert.alert(
        "Error",
        "First Name and last Name must contain at least 3 characters."
      );
    }
    const { result } = await run({
      args: [
        state.firstName,
        state.lastName,
        state.avatar,
        state.bio ? state.bio : null,
      ],
      sql: Statements.ADD_STUDENT(state.bio),
    });
    if (result[0].rowsAffected) {
      Alert.alert("Student Added", "Student has been added!!.");
      setState({ firstName: "", lastName: "", avatar: "", bio: "" });
      const { result } = await run({
        sql: Statements.ALL_STUDENTS.concat(order).concat(";"),
        args: [],
      });
      const stds = result[0].rows;
      setStudents(stds);
    }

    // db.transaction(
    //   (txt) => {
    //     txt.executeSql(Statements.ADD_STUDENT, [
    //       state.firstName,
    //       state.lastName,
    //       state.avatar,
    //       state.bio,
    //     ]);
    //   },
    //   (error) => {
    //     Alert.alert("Error", error.message);
    //   },
    //   async () => {
    //     setState({ firstName: "", lastName: "", avatar: "", bio: "" });
    //     await db.transaction((txt) => {
    //       txt.executeSql(
    //         Statements.ALL_STUDENTS,
    //         undefined,
    //         (_, { rows }) => {
    //           if (rows._array.length !== 0) {
    //             setStudents(rows._array);
    //           }
    //         },
    //         (error) => console.error(error)
    //       );
    //     });
    //     return Alert.alert("Student Added", "Student has been added!!.");
    //   }
    // );
  };
  return (
    <View style={{ width: "100%", padding: 10 }}>
      <Typography variant={"h1"}>Add student</Typography>
      <CustomTextInput
        value={state.firstName}
        onChangeText={(text) => setState((s) => ({ ...s, firstName: text }))}
        placeholder={"First Name"}
      />
      <CustomTextInput
        placeholder={"Last Name"}
        value={state.lastName}
        onChangeText={(text) => setState((s) => ({ ...s, lastName: text }))}
      />
      <CustomTextInput
        placeholder={"Avatar url"}
        value={state.avatar}
        onChangeText={(text) => setState((s) => ({ ...s, avatar: text }))}
      />
      <CustomTextInput
        placeholder={"Bio"}
        value={state.bio}
        onChangeText={(text) => setState((s) => ({ ...s, bio: text }))}
      />
      {!!student ? (
        <View style={{ flexDirection: "row" }}>
          <Button
            btnStyles={{
              marginRight: 10,
              width: 200,
            }}
            title={"Update Student"}
            onPress={update}
            color={"primary"}
          />
          <Button
            btnStyles={{
              width: 200,
            }}
            title={"Cancel"}
            onPress={() => {
              setStudent(null);
              setState({ firstName: "", lastName: "", avatar: "", bio: "" });
            }}
          />
        </View>
      ) : (
        <Button title={"Add Student"} onPress={add} color={"secondary"} />
      )}
    </View>
  );
};

export default Form;
