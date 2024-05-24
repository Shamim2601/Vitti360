const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rritagency@gmail.com',
    pass: 'vfof ticw etcp druj',
  },
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'rritagency@gmail.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
