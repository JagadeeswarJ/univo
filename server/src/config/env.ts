import dotenv from "dotenv";
import * as functions from "firebase-functions"
dotenv.config();

function getEnv(key: string, fallback = ""): string {
  return functions.config().env[key.toLowerCase()] ?? process.env[key];
}

const env = {
  PORT: getEnv("PORT", "8080"),

  // firebase collections
  USERS_COLLECTION: "users",
  EVENTS_COLLECTION: "events",
  REGISTRATIONS_COLLECTION: "registrations",
  NOTIFICATION_COLLECTION: "notifications",
  GAMIFICATIONS_COLLECTION: "gamifications",
  FEEDBACK_COLLECTION: "feedback",

  GOOGLE_CLOUD_PROJECT_ID: getEnv("GOOGLE_CLOUD_PROJECT_ID"),
  GOOGLE_CLOUD_PRIVATE_KEY: getEnv("GOOGLE_CLOUD_PRIVATE_KEY"),
  GOOGLE_CLOUD_CLIENT_EMAIL: getEnv("GOOGLE_CLOUD_CLIENT_EMAIL"),
  NODEMAILER_USER: getEnv("NODEMAILER_USER"),
  NODEMAILER_PASS: getEnv("NODEMAILER_PASS"),
  RAZORPAY_KEY_ID: getEnv("RAZORPAY_KEY_ID"),
  RAZORPAY_SECRET_KEY: getEnv("RAZORPAY_SECRET_KEY"),
  // more utily credentials
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRY: getEnv("JWT_EXPIRY"),
};

export { env };
