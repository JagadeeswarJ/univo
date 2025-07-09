"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitLoginForm = void 0;
const db_config_1 = require("../config/db.config");
const env_1 = require("../config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Reference to the user collection (replace with your actual collection)
const collection = db_config_1.db.collection(env_1.env.USERS_COLLECTION);
const submitLoginForm = async (req, res) => {
    try {
        const { username, password } = req.body;
        const docRef = collection.doc(username);
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
            return;
        }
        const userData = docSnapshot.data();
        if (!userData?.password) {
            res.status(400).json({
                success: false,
                message: "User record is corrupted or incomplete",
            });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, userData.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            username: userData.username,
            role: userData.role,
        }, env_1.env.JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                username: userData.username,
                name: userData.name,
                email: userData.email,
                role: userData.role,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.submitLoginForm = submitLoginForm;
