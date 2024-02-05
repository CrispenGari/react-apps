const express = require("express");
const { UserModel } = require("../models/user.model.js");
const { v4: uuid_v4 } = require("uuid");
const { ResetPasswordCodesModel } = require("../models/reset_codes.model.js");
const { sendEmail } = require("../utils/index.js");

const { encode2Base64, decodeFromBase64 } = require("@crispengari/utils");
const { hash, verify } = require("argon2");
const { isValidPassword } = require("@crispengari/regex-validator");

const resetPasswordRoutes = express.Router();

resetPasswordRoutes.post("/request-password-link", async (req, res) => {
  try {
    const { email } = req.body;
    const me = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!!!me) {
      return res.status(200).json({
        error: "That email address does not have an account.",
        message: null,
      });
    }
    const code = uuid_v4();
    await ResetPasswordCodesModel.create({
      email: me.email,
      code,
    });
    const html = `
    <b>Hi ${me.firstName} ${me.lastName}</b>
    <p>Click the following link to reset your password</p> 
    <a href="http://localhost:3000/new-password/?e=${encode2Base64(
      me.email
    )}&c=${encode2Base64(code)}">Reset Password</a>
    </p>
   <b> Kind regards</b><br/>
   <p>Our Team</p>
    `;
    // send verification email
    await sendEmail(email, "Reset Password", html);
    return res.status(200).json({
      error: null,
      message: "We have sent a request password link to " + me.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      message: null,
    });
  }
});

resetPasswordRoutes.put("/update-password", async (req, res) => {
  try {
    const { e, c, password } = req.body;
    const email = decodeFromBase64(e);
    const code = decodeFromBase64(c);
    const me = await UserModel.findOne({
      email,
    });
    if (!!!me) {
      return res.status(200).json({
        error: "The link is invalid.",
        message: null,
      });
    }
    const _code = await ResetPasswordCodesModel.findOne({
      email: me.email,
    });
    if (_code?.code !== code) {
      return res.status(200).json({
        error: "The link is invalid.",
        success: false,
      });
    }
    if (!isValidPassword(password.trim())) {
      return res.status(200).json({
        success: false,
        error:
          "the password must contain minimum eight characters, at least one letter and one number.",
      });
    }
    const correct = await verify(me.password, password.trim());
    if (correct) {
      return res.status(200).json({
        error: "You can not set the current password as the previous.",
        success: false,
      });
    }
    const hashed = await hash(password.trim());
    await UserModel.updateOne(
      {
        _id: me._id,
      },
      { password: hashed }
    );
    await ResetPasswordCodesModel.deleteOne({
      email: me.email,
    });
    return res.status(200).json({
      error: null,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
});

module.exports = {
  resetPasswordRoutes,
};
