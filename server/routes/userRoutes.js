const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.register);

router.get("/register", (req, res) => {
  console.log("this is the register");
});

router.post("/login", authController.login);

router.get("/login", (req, res) => {
  console.log("this is the login");
});

router.post("/verifyOtp", authController.verifyOTP);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

router.get("/getUser", authController.protect, userController.getUser);

module.exports = router;
