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

exports.verifyOtp = async (phone, code) => {
  if (phone && code.length === 6) {
    client.verify
      .services(process.env.SERVICE_SID)
      .verificationChecks.create({
        to: `${phone}`,
        code: code,
      })
      .then((data) => {
        if (data.status === "approved") {
          const user = await User.find({phone});
            await sendEmail(
              user,
              { title: "Welcome to Client Connect family" },
              "welcome"
            );
        }
      });
  } else {
    console.log("Hello");
  }
};
