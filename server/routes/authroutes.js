const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// auth with google
router.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/dashboard");
});

module.exports = router;