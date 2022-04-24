const router = require("express").Router();
const passport = require("passport");

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

//auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/auth/dashboard");
});

module.exports = router;
