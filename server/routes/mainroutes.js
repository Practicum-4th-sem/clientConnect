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

var UserDetails;
router.get("/Odashboard", authcheck, async (req, res) => {
  UserDetails = req.user;
  let auth_olduser = await authuser.find({ email: UserDetails.email });
  // console.log(req.path);
  auth_olduser.forEach((obj) => {
    UserDetails = obj;
  });
  // console.log(UserDetails.id);
  try {
    res.render("auth-dashboard", {
      id: UserDetails._id,
      naam: UserDetails.name,
      gmail: UserDetails.email,
      pic: UserDetails.photo,
    });
  } catch (error) {
    res.redirect("/");
  }
});

var dbuser;
router.get("/O-profile/:id", authcheck, async (req, res) => {
  // res.send(req.body);
  let dbuser;
  dbuser = await authuser.findById(UserDetails);

  try {
    res.render("auth-profile", {
      id: dbuser._id,
      name: dbuser.name,
      pic: dbuser.photo,
      email: dbuser.email,
    });
  } catch (error) {
    console.log(error);
  }
  // console.log(user, req.params.id);
});
// ------------------- end of Routing for dashboard using google oauth--------------------

// -----------------------Routing for dashboard using Register ----------------------------------
var userdetails;
router.get("/dashboard", authController.protect, async (req, res) => {
  let oldUser = await User.find({ email: req.body.email });
  oldUser.forEach((obj) => {
    userdetails = obj;
  });
  try {
    res.render("dashboard", {
      id: userdetails._id + "",
      naam: userdetails.name,
      gmail: userdetails.email,
      phone: userdetails.phone,
      pic: userdetails.photo,
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/register", (req, res) => {
  res.render("signup_multiform");
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

router.get("/login", (req, res) => {
  res.render("login_multiform");
});

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
    try {
      res.render("profile", {
        id: req.params.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        pic: user.photo,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
});
// -----------------------end of Routing for Profile ----------------------------------

router.post("/uploadPhoto", authController.protect, (req, res) => {
  userController.upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const user = await User.findById(res.locals.id);
      user.photo = req.file.filename;
      await user.save();
      res.redirect(`/profile/${res.locals.id}`);
      console.log(user);
    }
  });
});

router.post(
  "/updateProfile",
  authController.protect,
  // userController.updateMe,
  async function (req, res, next) {
    const user = await User.findByIdAndUpdate(res.locals.id, {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
    console.log(user);
    next();
  },
  (req, res) => {
    console.log("success");
    res.redirect(`/profile/${res.locals.id}`);
  }
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
