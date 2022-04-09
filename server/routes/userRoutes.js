const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register, (req, res) => {
    var naam = req.body.name;
    var mail = req.body.email;
    var password = req.boby.password;
    var mobile = req.body.phone;

    var d = {
        naam, mail, password, mobile,
    };
    console.log(d);
    res.render("landing_page");
});

router.get("/register", (req, res) => {
    console.log("this is the register");
    res.render("landing_page");
    //rendering the landing page for trial....
});

router.post("/login", authController.login);

router.get("/login", (req, res) => {
    console.log("this is the login");
    res.render("landing_page");
});

router.post("/verifyOtp", authController.verifyOTP);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

module.exports = router;
