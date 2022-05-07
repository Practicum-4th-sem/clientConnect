const User = require("../models/userModel");
const sendEmail = require("./email");

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.sendOtp = (phone) => {
  client.verify
    .services(process.env.SERVICE_SID)
    .verifications.create({
      to: `+91${phone}`,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.verifyOtp = async (req, res, next) => {
  const user = await User.findById(res.locals.id);
  if (user.phone && req.body.otp.length === 6) {
    const data = await client.verify
      .services(process.env.SERVICE_SID)
      .verificationChecks.create({
        to: `${user.phone}`,
        code: req.body.otp,
      });
    await sendEmail(
      user,
      { title: "Welcome to Client Connect family" },
      "welcome"
    );
    res.locals.status = data.status;
    next();
    // console.log(res.locals.status);
  } else {
    console.log("Hello");
  }
};
