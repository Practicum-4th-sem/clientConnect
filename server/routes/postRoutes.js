const Post = require("../models/postModel");
const postController = require("../controllers/postController");
// const User = require("../models/userModel");
const authController = require("../controllers/authController");

const router = require("express").Router();

router.get("/", postController.getPosts, (req, res, next) => {
  if (res.locals.number == 0) {
    res.render("notfound");
  } else {
    const post = res.locals.data;
    res.render("ad-post", {
      post,
    });
  }
});

router.get("/createPost", (req, res) => {
  res.render("create-post");
});

router.post("/createPost", postController.newPost, (req, res) => {
  res.redirect("/dashboard");
});

router.post("/uploadImages", authController.protect, (req, res, next) => {
  postController.upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      req.files.forEach((file) => {
        post.image.push(file.filename);
      });
      console.log(post.image);
    }
  });
});

module.exports = router;
