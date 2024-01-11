import "dotenv/config";
import express from "express";
import cors from "cors";
import { Person } from "./models.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3001;
const app = express();

const __url__ = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.l2qh8g7.mongodb.net/?retryWrites=true&w=majority`;
(async () => {
  app.use(cors());
  app.use(express.json());
  mongoose
    .connect(__url__, {})
    .then(() => {
      console.log("Connected to cloud mongodb.");
    })
    .catch((error) => console.error(error));
  app.post("/add", async (req, res) => {
    try {
      const data = req.body;
      const person = await Person.create({ ...data });
      return res.status(201).json(person);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get("/all", async (req, res) => {
    try {
      const people = await Person.find({});
      return res.status(200).json(people);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.listen(PORT);
})().then(() => {
  console.log("The server is listening on port: %s", PORT);
});
