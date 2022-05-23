const User = require("../models/userModel");
const Post = require("../models/postModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    const user = await User.findById(res.locals.id);
    // console.log(post);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:8000/dashboard",
      cancel_url: "http://localhost:8000/dashboard",
      customer_email: user.email,
      client_reference_id: req.params.postId,
      line_items: [
        {
          name: post.name,
          description: post.description,
          currency: "inr",
          amount: post.price * 100,
          images: [
            "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
          ],
          quantity: 1,
        },
      ],
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    console.log(error.message);
  }
};
