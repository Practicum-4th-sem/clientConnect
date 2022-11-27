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
      cancel_url: "http://localhost:8000/customer",
      customer_email: user.email,
      client_reference_id: req.params.postId,
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: post.price * 100,
            product_data: {
              name: post.name,
              description: post.description,
              // images: [post[0].image[0].url],
            },
          },
          quantity: 1,
        },
      ],
    });
    res.status(200).json({
      status: "success",
      session,
    });
    // next();
  } catch (error) {
    console.log(error.message);
  }
};
