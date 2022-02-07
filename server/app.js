const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);

module.exports = app;
