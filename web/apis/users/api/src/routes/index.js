const express = require("express");
const { loginRoutes } = require("./login.routes.js");
const { registerRoutes } = require("./register.routes.js");
const { userRoutes } = require("./user.routes.js");
const { logoutRoutes } = require("./logout.routes.js");
const { resetPasswordRoutes } = require("./reset_password.routes.js");
const { paymentsRoutes } = require("./payments.routes.js");

/*
GET: /all
GET: /:id

POST: /register
POST: /login
POST: /logout

PUT: /update-password
PUT: /update-profile

DELETE: /delete-account
*/

const userRoute = express.Router({
  caseSensitive: true,
});
const paymentRoute = express.Router({
  caseSensitive: true,
});
userRoute.use("/", loginRoutes);
userRoute.use("/", registerRoutes);
userRoute.use("/", userRoutes);
userRoute.use("/", logoutRoutes);
userRoute.use("/", resetPasswordRoutes);
paymentRoute.use("/", paymentsRoutes);

module.exports = {
  userRoute,
  paymentRoute,
};
