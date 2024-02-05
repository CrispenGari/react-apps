const express = require("express");
const argorn2 = require("argon2");
const crypto = require("crypto");
const { UserModel } = require("../models/user.model");
const { encode2Base64, decodeFromBase64 } = require("@crispengari/utils");
const {
  isValidEmail,
  isValidPassword,
} = require("@crispengari/regex-validator");
const { sendEmail } = require("../utils");
const { VerificationCodeModel } = require("../models/verification.model");

const registerRoutes = express.Router();
registerRoutes.post("/register", async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    if (!isValidEmail(email)) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "the email address is invalid.",
      });
    }
    if (!isValidPassword(password)) {
      return res.status(200).json({
        user: null,
        code: 200,
        error:
          "the password must contain minimum eight characters, at least one letter and one number.",
      });
    }
    if (!!!rest?.firstName || rest.firstName.trim() < 3) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "The first name must contain at least 3 characters.",
      });
    }
    if (!!!rest?.lastName || rest.lastName.trim() < 3) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "The last name must contain at least 3 characters.",
      });
    }
    const exists = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!!exists) {
      return res.status(200).json({
        user: null,
        code: 200,
        error: "the email address is already taken.",
      });
    }
    const hashedPassword = await argorn2.hash(password.trim());
    const code = crypto.randomInt(10000, 99999);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    await VerificationCodeModel.create({
      code,
      email,
    });
    const _code = encode2Base64(code.toString());
    const html = `
    <b>Hi ${rest.firstName} ${rest.lastName}</b>
    <p>We have detected that you want to register on our app with your email 
    <b>${email}</b> Here is your verification code: <br/><strong>${_code}</strong>
    </p>
   <b> Kind regards</b><br/>
   <p>Our Team</p>
    `;
    // send verification email
    await sendEmail(email, "Verify your email", html);
    req.session.userId = user._id;
    return res.status(200).json({ user, error: null, code: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", user: null, code: 500 });
  }
});

registerRoutes.post("/verify", async (req, res) => {
  try {
    const { code: verificationCode } = req.body;
    const _id = req.session.userId;
    const user = await UserModel.findById(_id);
    if (!!!user)
      return res.send(
        "<b>Failed to verify user the email does not have an account with us.</b>"
      );
    const code = await VerificationCodeModel.findOne({
      email: user.email,
    });
    if (!!!code) return res.send("<b>The verification code has expired.</b>");
    const _code = decodeFromBase64(verificationCode);
    if (code.code.toString() !== _code)
      return res.send("<b>Invalid verification code.</b>");
    await UserModel.updateOne({ email: user.email }, { verified: true });
    await VerificationCodeModel.deleteOne({
      email: user.email,
    });
    req.session.userId = user._id;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error", user: null, code: 500 });
  }
});

module.exports = { registerRoutes };
