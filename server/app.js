const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authroutes");
const mainRoutes = require("./routes/mainroutes");
const keys = require("./config/keys");
const CookieSession = require("cookie-session")
const passport = require("passport");
require("./config/passport_setup")(passport);

app.use(express.static("../public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "../views"));

app.use(CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));


//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//auth routes
app.use("/auth", authRoutes);
//home route
app.use("/", mainRoutes);

app.use("/api/v1/users", userRoutes);

app.get("/get", (req, res) => {
    console.log(keys.google.clientId);
});

module.exports = app;
