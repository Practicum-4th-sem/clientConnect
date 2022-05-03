const Post = require("../models/postModel");
const postController = require("../controllers/postController");
const User = require("../models/userModel");
const authController = require("../controllers/authController");

const router = require("express").Router();

router.get("/", postController.getPostsOfUser, postController.addedPost);

router.get("/uploadImages", (req, res) => {
  res.render("uploadImage", {
    user: req.query.user,
    post: req.query.post,
  });
});

router.post(
  "/uploadImages/",
  authController.protect,
  postController.uploadPhotos,
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
