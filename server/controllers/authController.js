const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendSms = require("../utils/twilio");
const sendEmail = require("../utils/email");

function issueToken(res, user) {
  const id = user._id;
  const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

exports.register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });

    await user.save();
    const token = issueToken(res, user);

    // await sendSms(user.phone, "hello from client connect");
    await sendEmail(user, { title: "Welcome to Client Connect" });
    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password!");
    }

    user.password = undefined;

    const token = issueJWT(res, user);
    return res.status(200).json({
      status: success,
      token,
    });
  } catch (error) {
    res.json(error.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("There is no user existing with this email.");
    }

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    try {
      await sendEmail(user, { title: "Reset Password", token: resetToken });
      res.status(200).json({
        status: "success",
        user,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("There was an error sending the mail.");
    }
  } catch (err) {
    res.json(err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");
    const user = await User.findOne({ passwordResetToken: hashedToken });
    if (!user) {
      throw new Error("Token is invalid or has expired. Please try again");
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const token = issueToken(res, user);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.json(err.message);
  }
};
