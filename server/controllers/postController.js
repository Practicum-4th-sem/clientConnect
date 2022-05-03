const Post = require("../models/postModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dir = "../public/img/posts";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: multerStorage,
}).array("image", 5);

exports.newPost = async (req, res, next) => {
  try {
    // console.log(req);

    const post = new Post({
      name: req.body.name,
      price: req.body.price,
      role: req.body.role,
      description: req.body.description,
      category: req.body.category,
    });
    await post.save();
    res.locals.id = post._id;
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
    res.locals.data = posts;
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
