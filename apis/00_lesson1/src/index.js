//  1. send emails and verifying accounts
const mongoose = require("mongoose");
const express = require("express");
const { userRoute } = require("./routes");

// constants
const PORT = 3000;
const DB_NAME = "users";
const CONN_URI = "mongodb://127.0.0.1:27017/" + DB_NAME;

// init server
const server = express();

(async () => {
  await mongoose
    .connect(CONN_URI)
    .then(() => console.log("connected to mongodb."));

  server.use(express.json());
  server.use("/api/user", userRoute);
  server.listen(PORT);
})().then(() => console.log("The server has started at port: 3000"));
