const nodemailer = require('nodemailer');
const { Password } = require('../server');
const { Email } = require('../controllers/user.controller');
/*
// NODEMAILER CONFIG
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: Email,
      pass: Password
    },
});

module.exports = transporter;*/