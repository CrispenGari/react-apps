import express from "express";
import cors from "cors";
import { recipes } from "./backing.js";
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json(recipes);
});
app.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const recipe = recipes.find((re) => re.id === id);
    if (!!!recipe) {
      return res
        .status(404)
        .json({ message: `The recipe of id "${id}" was not found.` });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log("The server is running on port: %s", PORT));
