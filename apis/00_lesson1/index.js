const express = require("express");
const server = express();

/*
 store todos in an array {id, completed, title, createAt}
*/
const users = [];
server.get("/:id/:phone/", (req, res) => {
  const { params, query } = req;
  const u = { ...params, ...query };
  users.push(u);
  return res.status(200).json({ user: u });
});
server.get("/", (req, res) => {
  return res.json(users);
});

server.listen(3000, () => console.log("The server has started at port: 3000"));
