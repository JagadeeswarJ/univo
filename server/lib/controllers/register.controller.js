"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitRegistrationForm = void 0;
const db_config_1 = require("../config/db.config");
const env_1 = require("../config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const collection = db_config_1.db.collection(env_1.env.USERS_COLLECTION);
const submitRegistrationForm = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = Math.floor(Math.random() * 90000) + 10000;
        const docRef = collection.doc(username);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            res.json({
                success: false,
                message: "UserName already exists",
            });
        }
        else {
            const hashedPassword = await bcrypt_1.default.hash(password, 10); // Salt rounds = 10
            const data = {
                ...req.body,
                userId: userId,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            };
            await collection.doc(username).set(data);
            console.log("Registration created successfully");
            res.status(200).json({
                success: true,
                message: "Registration created successfully",
            });
        }
    }
    catch (error) {
        console.error("Error occurred: ", error);
        res.status(500).json({
            success: false,
            message: "Failed",
            error: "Internal server error",
        });
    }
};
exports.submitRegistrationForm = submitRegistrationForm;
