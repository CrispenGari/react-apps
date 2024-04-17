import React from "react";
import { TouchableOpacity, Alert, Image } from "react-native";
import Typography from "../Typography/Typography";
import LazyImage from "../LazyImage/LazyImage";
import Button from "../Button/Button";
import { Statements, db, run } from "../../db";

const Student = ({ student, setStudents, setStudent, order }) => {
  const deleteStudent = async () => {
    const { result } = await run({
      args: [student.id],
      sql: Statements.DELETE_STUDENT,
    });
    if (result[0].rowsAffected) {
      Alert.alert("Student Deleted", "Student has been deleted!!.");
      const { result } = await run({
        sql: Statements.ALL_STUDENTS.concat(order).concat(";"),
        args: [],
      });
      const stds = result[0].rows;
      setStudents(stds);
    }
    // db.transaction(
    //   (txt) => {
    //     txt.executeSql(Statements.DELETE_STUDENT, [student.id]);
    //   },
    //   (error) => {
    //     Alert.alert("Error", error.message);
    //   },
    //   async () => {
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
    //     return Alert.alert("Student Deleted", "Student has been deleted!!.");
    //   }
    // );
  };
  const edit = () => setStudent(student);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#f5f5f5",
        padding: 10,
        width: 200,
        height: 250,
        marginRight: 10,
        alignItems: "center",
        borderRadius: 5,
      }}
      activeOpacity={0.5}
      onPress={edit}
    >
      <Typography variant={"h5"}>
        {student.firstName} {student.lastName}
      </Typography>
      <LazyImage
        uri={
          student?.avatar
            ? student?.avatar
            : Image.resolveAssetSource(require("../../assets/profile.jpg")).uri
        }
        style={{
          width: 100,
          height: 100,
          marginVertical: 10,
        }}
      />
      <Typography variant={"p"}>{student.bio}</Typography>

      <Button
        onPress={deleteStudent}
        title={"Delete"}
        btnStyles={{ marginTop: 10 }}
      />
    </TouchableOpacity>
  );
};

export default Student;
