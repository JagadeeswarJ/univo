import { Request, Response } from "express";
import { db } from "../config/db.config";
import { env } from "../config/env";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Reference to the user collection (replace with your actual collection)
const collection = db.collection(env.USERS_COLLECTION);

export const submitLoginForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Fetch user by username
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

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
            return;
        }

        // Generate JWT
        const token = jwt.sign(
            {
                username: userData.username,
                role: userData.role,
            },
            env.JWT_SECRET,
            { expiresIn: "2h" }
        );

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
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
