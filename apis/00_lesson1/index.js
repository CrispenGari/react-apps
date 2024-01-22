// 1. add mongodb, 2. send emails and verifying accounts

const express = require("express");
const argorn2 = require("argon2");

const server = express();
server.use(express.json());
const users = []; // {id, email, firstName, lastName, createdAt, password }
// POST/GET/PUT|PATCH/DELETE

/*
GET: /api/user/all
GET: /api/user/:id

POST: /api/user/register
POST: /api/user/login
POST: /api/user/logout

PUT: /api/user/update-password
PUT: /api/user/update-profile

DELETE: /api/user/delete-account

*/
server.get("/api/user/all", (req, res) => {
  try {
    return res.status(200).json({ users, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "internal server error.", code: 500, users: null });
  }
});
server.get("/api/user/:id", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    return res
      .status(200)
      .json({ user: user ? user : null, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "internal server error.", code: 500, user: null });
  }
});
server.post("/api/user/register", async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    // check if the email is valid (reg-exp) || password
    const exists = !!users.find((u) => u.email === email.trim().toLowerCase());
    if (exists) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "the email address is already taken.",
      });
    }
    const hashedPassword = await argorn2.hash(password.trim());
    const user = {
      id: ++users.length,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      ...rest,
      createdAt: new Date(),
    };
    users.unshift(user);
    return res.status(200).json({ user, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", user: null, code: 500 });
  }
});
server.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const me = users.find((u) => u.email === email.trim().toLowerCase());
    if (!!!me) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "The user with that email does not have an account.",
      });
    }
    const correct = await argorn2.verify(me.password, password.trim());
    if (!correct) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "Invalid password.",
      });
    }
    return res.status(200).json({ user: me, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", user: null, code: 500 });
  }
});
server.listen(3000, () => console.log("The server has started at port: 3000"));
