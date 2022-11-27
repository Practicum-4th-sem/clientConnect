/* eslint-disable */
import axios from "axios";
// const Stripe = require("stripe");
const stripe = Stripe(
  "pk_test_51M8JtpSFr6rnJ41TBtcTGaox19tXeApLciFlUJ8O4J597QsUu3hCUoKlIDlSLZrdPJg7i5MIA7Sb0caKZ2eqSb9R00MNKyuJyY"
);

export const buyPost = async (postId) => {
  try {
    // 1) get session
    const session = await axios.get(
      `http://localhost:8000/booking/checkout/${postId}`
    );
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error.message);
  }
};
