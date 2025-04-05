const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER || "sports@vnrvjiet.in",
    pass: process.env.NODEMAILER_PASS,
  },
});

export {transporter};