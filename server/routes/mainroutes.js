const User = require("../models/userModel");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const Db = require("../models/userModel");
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

// ------------------- Routing for dashboard using google oauth--------------------
router.get("/dashboard", authcheck, (req, res) => {
  const UserDetails = req.user;
  res.render("dashboard", {
    naam: UserDetails.name,
    gmail: UserDetails.email,
    pic: UserDetails.photo,
    phone: "",
  });
});
// ------------------- end of Routing for dashboard using google oauth--------------------

// -----------------------Routing for dashboard using Register ----------------------------------
var userdetails;
router.post("/reg-dashboard", authController.register, (req, res) => {
  console.log(req.body);
  userdetails = req.body;
  res.render("dashboard", {
    naam: req.body.name,
    gmail: req.body.email,
    phone: req.body.phone,
    pic: "",
  });
});

router.get("/reg-dashboard", (req, res) => {
  res.render("dashboard", {
    naam: userdetails.name,
    gmail: userdetails.email,
    phone: userdetails.phone,
    pic: "",
  });
});
// -----------------------end of Routing for dashboard using Register ----------------------------------


// -----------------------Routing for dashboard using login ----------------------------------
var olduser;
router.post("/log-dashboard", authController.login, async (req, res) => {
  const Founduser = req.body;
  // console.log(Founduser);
  olduser = await User.find({ email: Founduser.email });
  // console.log(olduser);
  res.render("dashboard", { naam: olduser.name, gmail: olduser.email, phone: olduser.email, pic: olduser.photo });
});

router.get("/log-dashboard", (req, res) => {
  // console.log(olduser);
  res.render("dashboard", { naam: olduser.name, gmail: olduser.email, phone: olduser.email, pic: olduser.photo });
});
// -----------------------end of routing for dashboard using login ----------------------------------


// -----------------------Routing for Profile ----------------------------------
router.get("/profile", (req, res) => {
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

router.get('/logout', authController.protect, authController.logout);
router.get("/getUser", authController.protect, userController.getUser);
router.delete('/deleteUser/:id', authController.protect, userController.deleteUser);
module.exports = router;
