import express from "express";
import { Todo } from "../models/index.js";

export const todoRouter = express.Router();

//   getting all todos
todoRouter.get("/todos", async (req, res) => {
  const todos = await Todo.findAll();
  return res.status(200).json(todos);
});
// getting a todo by id
todoRouter.get("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(Number.parseInt(req.params.id));
    if (!!!todo) {
      return res.status(404).json({
        error: `The todo with id ${req.params.id} was not found!`,
      });
    }
    return res.status(200).json(todo.toJSON());
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// add a todo
todoRouter.post("/create", async (req, res) => {
  const body = req.body;
  try {
    const todo = await Todo.create({ ...body });
    return res.status(201).json(todo.toJSON());
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// delete a todo
todoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(Number.parseInt(req.params.id));
    if (!!!todo) {
      return res.status(404).json({
        error: `The todo with id ${req.params.id} was not found!`,
      });
    }
    await todo.destroy();
    return res.status(201).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
// update a todo
todoRouter.put("/update/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(Number.parseInt(req.params.id));
    if (!!!todo) {
      return res.status(404).json({
        error: `The todo with id ${req.params.id} was not found!`,
      });
    }
    todo.completed = !todo.toJSON().completed;
    const t = await todo.save();
    return res.status(201).json(t.toJSON());
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
