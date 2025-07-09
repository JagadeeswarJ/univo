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
exports.submitRegistrationForm = void 0;
const db_config_1 = require("../config/db.config");
const env_1 = require("../config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const collection = db_config_1.db.collection(env_1.env.USERS_COLLECTION);
const submitRegistrationForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userId = Math.floor(Math.random() * 90000) + 10000;
        const docRef = collection.doc(username);
        const docSnapshot = yield docRef.get();
        if (docSnapshot.exists) {
            res.json({
                success: false,
                message: "UserName already exists",
            });
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10); // Salt rounds = 10
            const data = Object.assign(Object.assign({}, req.body), { userId: userId, password: hashedPassword, createdAt: new Date().toISOString() });
            yield collection.doc(username).set(data);
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
});
exports.submitRegistrationForm = submitRegistrationForm;
