"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const env_1 = require("./env");
const serviceAccountKey = {
    projectId: env_1.env.GOOGLE_CLOUD_PROJECT_ID,
    privateKey: env_1.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: env_1.env.GOOGLE_CLOUD_CLIENT_EMAIL,
};
const app = (0, app_1.initializeApp)({ credential: (0, app_1.cert)(serviceAccountKey) });
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
if (db) {
    console.log("Firebase initialized successfully");
}
else {
    throw new Error("Failed to initialise firebase");
}
