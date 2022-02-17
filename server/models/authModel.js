const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleid: String,
    username: String,
    image: String
});

const authuser = mongoose.model("authUser", userSchema);

module.exports = authuser;