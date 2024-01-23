const express = require("express");
const argorn2 = require("argon2");
const { UserModel } = require("../models/user.model");

const registerRoutes = express.Router();

const validateFields = (fields) => {
  const res = Object.values(fields)
    .map((v) => !!v.trim())
    .every((v) => v);
  if (!res)
    return {
      user: null,
      code: 200,
      error:
        "Check if you passed firstName, email, password, lastName in your request because they are required.",
    };
  return null;
};

registerRoutes.post("/register", async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    // check if the email is valid (reg-exp) || password
    const exists = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });
    const error = validateFields({
      email: email || "",
      password: password || "",
      firstName: rest?.firstName || "",
      lastName: rest?.lastName || "",
    });
    if (!!error) return res.status(200).json(error);
    if (!!exists) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "the email address is already taken.",
      });
    }
    const hashedPassword = await argorn2.hash(password.trim());
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    return res.status(200).json({ user, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", user: null, code: 500 });
  }
});

module.exports = { registerRoutes };
