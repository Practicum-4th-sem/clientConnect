const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleid: String,
    name: String,
    email: String,
    photo: String
});

const authuser = mongoose.model("authUser", userSchema);

module.exports = authuser;