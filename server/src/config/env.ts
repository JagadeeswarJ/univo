import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
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

  // google cloud credentials for storage
  GOOGLE_CLOUD_PROJECT_ID: getEnv("GOOGLE_CLOUD_PROJECT_ID"),
  GOOGLE_CLOUD_PRIVATE_KEY: getEnv("GOOGLE_CLOUD_PRIVATE_KEY"),
  GOOGLE_CLOUD_CLIENT_EMAIL: getEnv("GOOGLE_CLOUD_CLIENT_EMAIL"),

  // more utily credentials
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRY: getEnv("JWT_EXPIRY"),
};

export { env };
