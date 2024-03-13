import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import { todoRouter } from "./routes/todo.routes.js";

const PORT = 3001;
const app = express();

(async () => {
  await sequelize.sync({ force: false });
  console.log("All models were synchronized successfully.");
  app.use(express.json());
  app.use(cors());
  app.use(todoRouter);
  app.listen(PORT);
})().then(() => {
  console.log("The server is running on port: %s", PORT);
});
