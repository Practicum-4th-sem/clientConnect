const nodemailer = require("nodemailer");
const pug = require("pug");

const sendEmail = async (user, subject, template) => {
  let to = user.email;

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
    firstName: user.name,
    subject: subject,
  });

  let mailOptions = {
    from: `Client Connect <${process.env.USER_ADDRESS}>`,
    to,
    subject: subject.title,
    html,
  };

  await transport.sendMail(mailOptions, (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent successfully!");
  });
};

module.exports = sendEmail;
