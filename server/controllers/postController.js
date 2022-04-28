const Post = require("../models/postModel");

exports.newPost = async (req, res, next) => {
  try {
    const post = new Post({
      name: req.body.name,
      price: req.body.price,
      role: req.body.role,
      description: req.body.description,
    });
    await post.save();
    next();
  } catch (err) {
    console.log(err.message);
  }
};
