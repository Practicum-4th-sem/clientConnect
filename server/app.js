const express = require("express");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authroutes");
const mainRoutes = require("./routes/mainroutes");
const keys = require("./config/keys");
const CookieSession = require("cookie-session");
const ejs = require("ejs");
const passport = require("passport");
require("./config/passport_setup")(passport);
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("../public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(
  CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);
app.use(cookieParser());
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// middleware

//auth routes
app.use("/auth", authRoutes);
//home route
app.use("/", mainRoutes);

// app.use("/users", userRoutes);

module.exports = app;
