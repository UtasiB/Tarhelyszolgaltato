const nodemailer = require('nodemailer');
const { password } = require('../server');
const { Email } = require('../controllers/user.controller');

// NODEMAILER CONFIG
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: Email,
      pass: password
    },
});

module.exports = transporter;