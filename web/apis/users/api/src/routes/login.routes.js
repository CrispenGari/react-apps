const express = require("express");
const { UserModel } = require("../models/user.model");
const argorn2 = require("argon2");
const loginRoutes = express.Router();
loginRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const me = await UserModel.findOne({
      email: email ? email.trim().toLowerCase() : "",
    });
    if (!!!me) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "The user with that email does not have an account.",
      });
    }
    if (!me.verified) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "The email of this account is not verified.",
      });
    }
    const correct = await argorn2.verify(
      me.password,
      password ? password.trim() : ""
    );
    if (!correct) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "Invalid password.",
      });
    }
    req.session.userId = me._id;
    return res.status(200).json({ user: me, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", user: null, code: 500 });
  }
});

module.exports = { loginRoutes };
