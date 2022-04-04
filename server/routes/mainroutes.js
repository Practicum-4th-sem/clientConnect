const User = require("../models/userModel");

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
  //console.log(req.user);
  const UserDetails = req.user;
  res.render("dashboard", {
    naam: UserDetails.username,
    gmail: UserDetails.Gmail,
    photo: UserDetails.image,
  });
});

router.post("/register", (req, res) => {
  console.log("Register", req);
});

router.post("/login", (req, res) => {
  console.log("Login", req);
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", authcheck, (req, res) => {
  res.render("profile", { User: req.user.username, Image: req.user.image });
});

module.exports = router;
