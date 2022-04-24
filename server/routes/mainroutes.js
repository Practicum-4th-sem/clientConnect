const User = require("../models/userModel");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const Db = require("../models/userModel");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("landing_page");
});
// router.get("/login", (req, res) => {
//   res.render("login");
// });

// -----------------------Routing for dashboard using Register ----------------------------------
var userdetails;
router.get("/dashboard", authController.protect, (req, res) => {
  res.render("dashboard", {
    naam: userdetails.name,
    gmail: userdetails.email,
    phone: userdetails.phone,
    pic: "",
  });
});
router.post("/register", authController.register, (req, res) => {
  // console.log(req.body);
  userdetails = req.body;
  res.redirect("/dashboard");
});

// -----------------------end of Routing for dashboard using Register ----------------------------------

// -----------------------Routing for dashboard using login ----------------------------------
var olduser;
router.post("/log-dashboard", authController.login, async (req, res) => {
  const Founduser = req.body;
  // console.log(Founduser);
  olduser = await User.find({ email: Founduser.email });
  // console.log(olduser);
  res.render("dashboard", {
    naam: olduser.name,
    gmail: olduser.email,
    phone: olduser.email,
    pic: olduser.photo,
  });
});

router.get("/log-dashboard", (req, res) => {
  // console.log(olduser);
  res.render("dashboard", {
    naam: olduser.name,
    gmail: olduser.email,
    phone: olduser.email,
    pic: olduser.photo,
  });
});
// -----------------------end of routing for dashboard using login ----------------------------------

// -----------------------Routing for Profile ----------------------------------
router.get("/profile", authController.protect, (req, res) => {
  console.log(req.body);
  res.render("profile");
});
// -----------------------end of Routing for Profile ----------------------------------

router.patch(
  "/updateProfile/:id",
  authController.protect,
  userController.upload.single("photo"),
  userController.updateMe
);
router.post("/verifyOtp", authController.verifyOTP);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

router.get(
  "/logout",
  authController.protect,
  authController.logout,
  (req, res) => {
    res.redirect("/");
  }
);
router.get("/getUser", authController.protect, userController.getUser);
router.delete(
  "/deleteUser/:id",
  authController.protect,
  userController.deleteUser,
  (req, res) => {
    res.redirect("/");
  }
);
module.exports = router;
