const nodemailer = require("nodemailer");

const sendEmail = async (user, subject) => {
  let to = user.email;

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: `Client Connect <${process.env.USER_ADDRESS}>`,
    to,
    subject: subject.title,
    html: "<p>Hello and welcome to Client Connect</p>",
  };

  await transport.sendMail(mailOptions, (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent successfully!");
  });
};

module.exports = sendEmail;
