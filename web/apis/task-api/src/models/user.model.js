import mongoose from "mongoose";

export const User = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      loggedIn: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);
