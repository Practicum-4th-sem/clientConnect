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
    res.render("landing_page");
});

router.get("/profile", authcheck, (req, res) => {
    res.render("profile", { User: req.user.username, Image: req.user.image });
});

module.exports = router;