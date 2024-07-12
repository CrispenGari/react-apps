import express from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { signJwt, verifyJwt } from "../utils/index.js";
import { ObjectId } from "mongodb";

const authRoute = express.Router({
  caseSensitive: true,
});

const handleError = (error, res) => {
  return res.status(500).json({
    error: "Internal server error.",
  });
};

authRoute.get("/me", async (req, res) => {
  try {
    const [_, jwt] = req.headers.authorization.split(/\s/);
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return res.status(200).json({
        error: "The session has expired login again!",
      });
    const _id = new ObjectId(payload._id);
    const me = await User.findById(_id);
    return res.status(200).json(me);
  } catch (error) {
    return handleError(error, res);
  }
});
authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (password.trim().length < 3)
      return res
        .status(200)
        .json({ error: "The password must be at least 3 characters." });
    const me = await User.findOne({ email: email.trim().toLowerCase() });
    if (!!!me)
      return res
        .status(200)
        .json({ error: "The email address does not have a user." });
    const correct = await bcryptjs.compare(password.trim(), me.password);
    if (!correct)
      return res.status(200).json({ error: "Invalid account password." });
    await User.updateOne({ email: me.email }, { loggedIn: true });
    const jwt = await signJwt(me);
    return res.status(200).json({ jwt });
  } catch (error) {
    return handleError(error, res);
  }
});
authRoute.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (password.trim().length < 3)
      return res
        .status(200)
        .json({ error: "The password must be at least 3 characters." });
    const me = await User.findOne({ email: email.trim().toLowerCase() });
    if (!!me)
      return res.status(200).json({ error: "The email is already in use" });
    const hashedPassword = await bcryptjs.hash(password.trim(), 12);
    const user = await User.create({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      loggedIn: true,
    });
    const jwt = await signJwt(user);
    return res.status(200).json({ jwt });
  } catch (error) {
    return handleError(error, res);
  }
});
authRoute.post("/logout", async (req, res) => {
  try {
    const [_, jwt] = req.headers.authorization.split(/\s/);
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return res.status(200).json({
        error: "The session has expired login again!",
      });
    const _id = new ObjectId(payload._id);
    await User.updateOne({ _id }, { loggedIn: false });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return handleError(error, res);
  }
});

//
authRoute.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const me = await User.findOne({ email: email.trim().toLowerCase() });
    if (!!!me) return res.status(200).json({ error: "Invalid email address" });
    const jwt = await signJwt(me);
    return res.status(200).json({ jwt });
  } catch (error) {
    return handleError(error, res);
  }
});
authRoute.post("/change-password", async () => {
  try {
    const { confirm, password } = req.body;
    if (password.trim().length < 3)
      return res
        .status(200)
        .json({ error: "The password must be at least 3 characters." });

    if (password.trim() !== confirm.trim())
      return res.status(200).json({ error: "The password must match." });
    const [_, jwt] = req.headers.authorization.split(/\s/);
    const payload = await verifyJwt(jwt);
    const _id = new ObjectId(payload._id);
    const me = await User.findById(_id);
    if (!!me) return res.status(200).json({ error: "Something went wrong." });
    const hashedPassword = await bcryptjs.hash(password.trim(), 12);
    await User.findByIdAndUpdate(_id, {
      password: hashedPassword,
      loggedIn: true,
    });
    const token = await signJwt(me);
    return res.status(200).json({ jwt: token });
  } catch (error) {
    return handleError(error, res);
  }
});

export default authRoute;
