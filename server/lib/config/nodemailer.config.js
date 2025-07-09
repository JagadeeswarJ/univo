"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
// const nodemailer = require("nodemailer");
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("./env");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
        user: env_1.env.NODEMAILER_USER,
        pass: env_1.env.NODEMAILER_PASS,
    },
});
exports.transporter = transporter;
