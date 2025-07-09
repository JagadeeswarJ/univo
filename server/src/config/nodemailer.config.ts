// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"
import { env } from "./env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: env.NODEMAILER_USER, 
    pass: env.NODEMAILER_PASS,
  },
});

export {transporter};