import { Response, Request } from "express";
import { db } from "../config/db.config";
import { env } from "../config/env";
import bcrypt from "bcrypt";

const collection = db.collection(env.USERS_COLLECTION);


export const submitRegistrationForm = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

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
  } catch (error) {
    console.error("Error occurred: ", error);
    res.status(500).json({
      success: false,
      message: "Failed",
      error: "Internal server error",
    });
  }
};
