const nodeMailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //dls connection
    auth: {
      user: "sudhisumesh854797@gmail.com",
      pass: "dlkx uqtt oblj kwvn",
    },
  });
  const info = await transporter.sendMail({
    from: '"Salalah " <sudhisumesh854797@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    html: `<h2>your OTP IS ${otp}</h2>`, // html body
  });
};

module.exports = sendEmail;
