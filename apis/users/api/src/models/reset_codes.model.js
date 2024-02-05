const mongoose = require("mongoose");
const ResetPasswordCodes = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
});
module.exports = {
  ResetPasswordCodesModel: mongoose.model(
    "reset_password_codes",
    ResetPasswordCodes
  ),
};
