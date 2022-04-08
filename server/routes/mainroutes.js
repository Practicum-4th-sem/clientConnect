const User = require("../models/userModel");

const router = require("express").Router();

const authcheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("/");
    }
    else {
        next();
    }
};

router.get("/", (req, res) => {
    res.render("login");
});

router.get("/dashboard", authcheck, (req, res) => {
    const UserDetails = req.user;
    res.render("dashboard", { UserDetails, naam: UserDetails.name, gmail: UserDetails.email, pic: UserDetails.photo, phone: UserDetails.phone });
});


router.get("/api/v1/users/profile", authcheck, (req, res) => {
    res.render("profile", { User: req.user.username, Image: req.user.image });
});

module.exports = router;