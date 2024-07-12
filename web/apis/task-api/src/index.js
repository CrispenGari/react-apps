import "dotenv/config";
import express from "express";
import authRoute from "./routes/auth.routes.js";
import mongoose from "mongoose";

const server = express();
const { DB_CONNECTION_URI, DB_NAME, PORT } = process.env;

mongoose
  .connect(`${DB_CONNECTION_URI}/${DB_NAME}`, {})
  .then(() => console.log("Connected to mongodb database!!"))
  .catch((err) => console.error(err.message));

server.use(express.json());

server.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hi",
  });
});

server.use("/api/v1/auth", authRoute);

server.listen(PORT, () =>
  console.log("The server is running on port: %s", PORT)
);
