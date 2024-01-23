const express = require("express");
const { loginRoutes } = require("./login.routes.js");
const { registerRoutes } = require("./register.routes.js");
const { userRoutes } = require("./user.routes.js");

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
userRoute.use("/", loginRoutes);
userRoute.use("/", registerRoutes);
userRoute.use("/", userRoutes);

module.exports = {
  userRoute,
};
