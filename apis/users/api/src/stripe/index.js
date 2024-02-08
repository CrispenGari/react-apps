const Stripe = require("stripe");
export const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION,
});
