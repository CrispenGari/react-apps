const express = require("express");
const { stripe } = require("../stripe");
const { UserModel } = require("../models/user.model");

const paymentsRoutes = express.Router();

paymentsRoutes.post("/pay", async (req, res) => {
  try {
    const _id = req.session.userId;
    const amount = 5000;
    const me = await UserModel.findById(_id);
    if (!me)
      return res.status(200).json({
        error: "You can not make payment if you are not authenticated.",
      });

    /**
     * check if they have already paid (query in the payment model based on email, id)
     * if the have  payment
     * retum message telling them they have paid
     * 
     *   return res.status(200).json({
        message: "paid.",
      });
     */
    // store in the database
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "zar",
      automatic_payment_methods: { enabled: true },
    });

    /**
     * store the email and amount that have paid in the database (some stuff)
     */

    const secrete = intent.client_secret;
    return res.status(200).json({ secrete });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
});

module.exports = {
  paymentsRoutes,
};
