const User = require("../models/userModel");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const Db = require("../models/userModel");
const authuser = require("../models/authModel");

const router = require("express").Router();

const authcheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  res.render("landing_page");
});
// router.get("/login", (req, res) => {
//   res.render("login");
// });

// ------------------- Routing for dashboard using google oauth--------------------
router.get("/Odashboard", authcheck, async (req, res) => {
  const UserDetails = req.user;
  let auth_olduser = await authuser.find({ email: UserDetails.email });
  // console.log(auth_olduser);
  res.render("dashboard", {
    id: auth_olduser._id + "",
    naam: UserDetails.name,
    gmail: UserDetails.email,
    pic: UserDetails.photo,
    phone: "",
  });
});
router.get("/O-profile", authcheck, async (req, res) => {
  console.log(req.body);
  // const old-auth-user= await authuser.find({email:req.body.email});
});
// ------------------- end of Routing for dashboard using google oauth--------------------

// -----------------------Routing for dashboard using Register ----------------------------------
var userdetails;
router.get("/+dashboard", authController.protect, async (req, res) => {
  let oldUser = await User.find({ email: req.body.email });
  oldUser.forEach((obj) => {
    userdetails = obj;
  });
  // console.log("params are " + req.params);
  res.render("dashboard", {
    id: userdetails._id + "",
    naam: userdetails.name,
    gmail: userdetails.email,
    phone: userdetails.phone,
    pic: userdetails.photo,
  });
});
router.post("/register", authController.register, async (req, res) => {
  let oldUser = await User.find({ email: req.body.email });
  oldUser.forEach((obj) => {
    userdetails = obj;
  });
  res.redirect("/dashboard");
});

// -----------------------end of Routing for dashboard using Register ----------------------------------

// -----------------------Routing for dashboard using login ----------------------------------
router.post("/login", authController.login, async (req, res) => {
  let oldUser = await User.find({ email: req.body.email });
  oldUser.forEach((obj) => {
    userdetails = obj;
  });
  res.redirect("/dashboard");
});
// -----------------------end of routing for dashboard using login ----------------------------------

// -----------------------Routing for Profile ----------------------------------
router.get("/profile/:id", authController.protect, async (req, res) => {
  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findById(req.params.id);
    // console.log(user, req.params.id);

    res.render("profile", {
      id: req.params.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }
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
