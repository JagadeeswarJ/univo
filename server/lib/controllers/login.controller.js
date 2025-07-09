"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const submitLoginForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const docRef = collection.doc(username);
        const docSnapshot = yield docRef.get();
        if (!docSnapshot.exists) {
            res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
            return;
        }
        const userData = docSnapshot.data();
        if (!(userData === null || userData === void 0 ? void 0 : userData.password)) {
            res.status(400).json({
                success: false,
                message: "User record is corrupted or incomplete",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, userData.password);
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
});
exports.submitLoginForm = submitLoginForm;
