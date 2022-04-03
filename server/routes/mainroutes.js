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
    res.render("dashboard");
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/profile", authcheck, (req, res) => {
    res.render("profile", { User: req.user.username, Image: req.user.image });
});

module.exports = router;