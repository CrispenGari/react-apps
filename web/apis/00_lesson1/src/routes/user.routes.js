const express = require("express");
const { UserModel } = require("../models/user.model.js");
const { default: mongoose } = require("mongoose");

const userRoutes = express.Router();
userRoutes.get("/all", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({ users, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "internal server error.", code: 500, users: null });
  }
});
userRoutes.get("/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await UserModel.findById(_id);
    return res
      .status(200)
      .json({ user: user ? user : null, error: null, code: 200 });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error.", code: 500, user: null });
  }
});

module.exports = {
  userRoutes,
};
