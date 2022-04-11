const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const sendSms = require("../utils/twilio");
const sendEmail = require("../utils/email");
const { sendOtp } = require("../utils/verify");

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
      phone: `+91${req.body.phone}`,
    });

    // sendOtp(user.phone);
    await user.save();

    // let otp = ;
    // user.otp = otp;
    sendOtp(user.phone);
    // if (await this.verifyOTP(req)) {
    // await user.save();
    sendSms(user.phone, `hello from client connect.`);

    const token = issueToken(res, user);

    await sendEmail(
      user,
      { title: "Welcome to Client Connect family" },
      "welcome"
    );
    return res.status(200).json({
      token,
    });
    // }
  } catch (err) {
    res.json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password!");
    }

    user.password = undefined;

    const token = issueToken(res, user);
    return res.status(200).json({
      token,
    });
  } catch (error) {
    res.json(error.message);
  }
};

exports.protect = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("You are not logged in! Please log in to get access.");
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new Error("The user does not exist anymore.");
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
      await sendEmail(
        user,
        { title: "Reset Password", token: resetToken },
        "resetPassword"
      );
      res.status(200).json({
        status: "success",
        user,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("There was an error sending the email.");
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

exports.verifyOTP = async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });
  const { otp } = req.body;
  if (!(await user.verifyOntp(otp, user.otp))) {
    throw new Error("Incorrect otp entered");
  } else {
    res.json({
      status: "verified",
    });
  }
};
