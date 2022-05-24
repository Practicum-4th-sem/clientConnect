/* eslint-disable */
import axios from "axios";
// const axios = require("axios");
// const Stripe = require("stripe");

const stripe = Stripe(
  "pk_test_51JkjtvSDrI4DVIWq7NEdFb38cpUwIQWbfEvdZaMEgVjcS2wy5J4uosm0lEmpAqHp8wqW6SX6261fcj3a65toyZos00TXcrxcVW"
);

export const buyPost = async (postId) => {
  try {
    // 1) get session
    const session = await axios.get(`/booking/checkout/${postId}`);
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error.message);
  }
};
