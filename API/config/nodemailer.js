const nodemailer = require('nodemailer');
const { password } = require('../server');
const { email } = require('../controllers/user.controller');

// NODEMAILER CONFIG
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password
    },
});

module.exports = transporter;