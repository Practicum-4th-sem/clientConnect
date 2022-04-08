const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);

router.get("/register", (req, res) => {
    console.log("this is the register");
    res.render("langing_page");
    //rendering the landing page for trial....
});

router.post("/login", authController.login);

router.get("/login", (req, res) => {
    console.log("this is the login");
    res.render("langing_page");
});

router.post("/verifyOtp", authController.verifyOTP);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

module.exports = router;
