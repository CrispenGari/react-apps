require("dotenv/config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes");
const session = require("express-session");

// constants
const PORT = 4000;
const DB_NAME = "users";
const CONN_URI = "mongodb://127.0.0.1:27017/" + DB_NAME;

// init server
const server = express();

(async () => {
  await mongoose
    .connect(CONN_URI)
    .then(() => console.log("connected to mongodb."));
  server.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  server.use(
    session({
      secret: "anything",
      resave: false,
      saveUninitialized: false,
      name: "uid",
      cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        domain: "localhost",
        maxAge: 1000 * 60 * 60 * 24, //* 365 * 10, // 10 years
      },
    })
  );
  server.use(express.json());

  server.use("/api/user", userRoute);

  server.listen(PORT);
})().then(() => console.log("The server has started at port: 4000"));
