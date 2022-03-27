require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./../models/userModel");
const sendSms = require("../utils/twilio");

exports.generateOtp = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.sendOtp = async (phone) => {
  const user = await User.findOne({ phone });
  const otpString = this.generateOtp();
  user.otp = otpString;
  await user.save();
  console.log(otpString);
  sendSms(phone, otpString);
};

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = require("twilio")(accountSid, authToken);
// exports.sendOtp = (phone) => {

//   client.verify
//     .services(process.env.SERVICE_SID)
//     .verifications.create({
//       to: `${phone}`,
//       channel: "sms",
//     })
//     .then((verification) => console.log(verification.status));
// };

// exports.verifyOtp = (otp, phone) => {
//   if ( otp.length === 6) {
//     client.verify
//       .services(process.env.SERVICE_SID)
//       .verificationChecks.create({
//         to: `${phone}`,
//         code: otp,
//       })
//       .then((data) => {
//         if (data.status === "approved") {
//           return true;
//           //   res.status(200).json({
//           //     message: "User is Verified!!",
//           //     data,
//           //   });
//         }
//       });
//   } else {
//     return false;
//     // res.status(400).json({
//     //   message: "Wrong phone number or code :(",
//     //   phonenumber: req.query.phone,
//     //   data,
//     // });
//   }
// };

// export default generateOtp;
