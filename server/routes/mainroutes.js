const User = require("../models/userModel");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = require("express").Router();

const authcheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/dashboard", authcheck, (req, res) => {
  const UserDetails = req.user;
  res.render("dashboard", {
    naam: UserDetails.name,
    gmail: UserDetails.email,
    pic: UserDetails.photo,
    phone: "",
  });
});

var userdetails;
router.post("/register", authController.register, (req, res) => {
  console.log(req.body);
  userdetails = req.body;
  res.render("dashboard", {
    naam: req.body.name,
    gmail: req.body.email,
    phone: req.body.phone,
    pic: "",
  });
});

router.get("/register", (req, res) => {
  res.render("dashboard", {
    naam: userdetails.name,
    gmail: userdetails.email,
    phone: userdetails.phone,
    pic: "",
  });
});

router.post("/login", authController.login, (req, res) => {
  const Founduser = req.body;
});

router.get("/login", (req, res) => {
  console.log("loging in...");
  // const curUser=
});

router.patch(
  "/updateProfile",
  authController.protect,
  userController.upload.single("photo"),
  userController.updateMe
);
router.post("/verifyOtp", authController.verifyOTP);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

router.get("/profile", authcheck, (req, res) => {
  res.render("profile", { User: req.user.username, Image: req.user.image });
});

router.get("/getUser", authController.protect, userController.getUser);

module.exports = router;
