require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.sendOtp = (phone) => {
  client.verify
    .services("VA6b4fd45f8163b3bcf09f008a031be7dd")
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

exports.verifyOtp = (phone, code) => {
  if (phone && code.length === 6) {
    client.verify
      .services("VA6b4fd45f8163b3bcf09f008a031be7dd")
      .verificationChecks.create({
        to: `${phone}`,
        code: code,
      })
      .then((data) => {
        if (data.status === "approved") {
          // res.status(200).json({
          //   message: "User is Verified!!",
          //   data,
          // });

          // console.log(data);
          return true;
        }
      });
  } else {
    // res.status(400).json({
    //   message: "Wrong phone number or code :(",
    //   phonenumber: phone,
    //   data,
    // });
    console.log("hello");
    return false;
  }
};

// module.exports = sendSms;

// const sendSms = (phone, message) => {

//   client.messages
//     .create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     })
//     .then((message) => console.log(message.sid));
// };
