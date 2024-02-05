const mongoose = require("mongoose");
const exp = 60; //60
const VerificationCodeSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  {
    autoCreate: false,
    expireAfterSeconds: exp,
  }
);
module.exports = {
  VerificationCodeModel: mongoose.model(
    "verification_codes",
    VerificationCodeSchema
  ),
};
