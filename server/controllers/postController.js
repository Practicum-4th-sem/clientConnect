const Post = require("../models/postModel");

exports.newPost = async (req, res, next) => {
  try {
    const post = new Post({
      name: req.body.name,
      price: req.body.price,
      role: req.body.role,
      description: req.body.description,
      category: req.body.category,
    });
    await post.save();
    next();
  } catch (err) {
    console.log(err.message);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    //building query
    const queryObj = { ...req.query };
    const query = Post.find(queryObj);

    //execute query
    const posts = await query;
    res.locals.number = posts.length;
    // res.status(200).json({
    //   status: "success",
    //   results: posts.length,
    //   data: {
    //     posts,
    //   },
    // });
    next();
  } catch (err) {
    console.log(err.message);
  }
};
