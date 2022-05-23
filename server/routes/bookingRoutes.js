const authController = require("../controllers/authController");
// const userController = require("../controllers/userController");
// const postController = require("../controllers/postController");
const bookingController = require("../controllers/bookingController");
const router = require("express").Router();

router.get(
  "/checkout/:postId",
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
