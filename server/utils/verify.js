require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

exports.sendOtp = (phone) => {
  const client = require("twilio")(accountSid, authToken);
  client.verify
    .services(process.env.SERVICE_SID)
    .verifications.create({
      to: `${phone}`,
      channel: "sms",
    })
    .then((verification) => console.log(verification.status));
};

exports.verifyOtp = (otp) => {
  if (req.body.phone && otp.length === 6) {
    client.verify
      .services(process.env.SERVICE_SID)
      .verificationChecks.create({
        to: `${phone}`,
        code: otp,
      })
      .then((data) => {
        if (data.status === "approved") {
          return true;
          //   res.status(200).json({
          //     message: "User is Verified!!",
          //     data,
          //   });
        }
      });
  } else {
    return false;
    // res.status(400).json({
    //   message: "Wrong phone number or code :(",
    //   phonenumber: req.query.phone,
    //   data,
    // });
  }
};
