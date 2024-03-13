const express = require("express");

const logoutRoutes = express.Router();
logoutRoutes.post("/logout", async (req, res) => {
  try {
    res.clearCookie("uid");
    req.session.destroy((error) => {
      if (error) {
        return res.status(200).json({ success: false });
      }
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

module.exports = { logoutRoutes };
