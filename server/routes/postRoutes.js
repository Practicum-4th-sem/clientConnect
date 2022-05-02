const Post = require("../models/postModel");
const postController = require("../controllers/postController");

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

module.exports = router;
