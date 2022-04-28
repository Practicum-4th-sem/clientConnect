const Post = require("../models/postModel");
const postController = require("../controllers/postController");

const router = require("express").Router();

router.get("/", postController.getPosts, (req, res, next) => {
  if (res.locals.number == 0) {
    res.render("notfound");
  } else {
    next();
  }
});

module.exports = router;
