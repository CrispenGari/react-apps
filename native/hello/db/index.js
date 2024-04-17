import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("students.db");

// id, firstName, lastName, avatar
export const Statements = {
  CREATE_TABLE_STATEMENT: `
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            avatar TEXT,
            bio TEXT DEFAULT 'Im a student.'
        );
    `,
  ADD_STUDENT(bio) {
    if (!!!bio)
      return `INSERT INTO students (firstName, lastName, avatar) VALUES (?, ?, ?);`;
    return `INSERT INTO students (firstName, lastName, avatar, bio) VALUES (?, ?, ?, ?);`;
  },
  ALL_STUDENTS: `SELECT id, firstName, lastName, avatar, bio FROM students ORDER BY id `,
  DELETE_STUDENT: `DELETE FROM students WHERE id = ?;`,
  UPDATE_STUDENT(bio) {
    if (!!!bio) {
      return `UPDATE students SET firstName = ?, lastName = ?, avatar = ? WHERE id = ?;`;
    }
    return `UPDATE students SET firstName = ?, lastName = ?, avatar = ?, bio = ? WHERE id = ?;`;
  },
};

export const run = async ({ sql, args }) => {
  const result = await db.execAsync([{ sql, args }], false);
  return { result };
};

// const readOnly = true;
// await db.transactionAsync(async (tx) => {
//   const result = await tx.executeSqlAsync("SELECT COUNT(*) FROM USERS", []);
//   console.log("Count:", result.rows[0]["COUNT(*)"]);
// }, readOnly);
