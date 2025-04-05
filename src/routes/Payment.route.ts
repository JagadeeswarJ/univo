import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import { register, success } from "../controllers/payment.controller";

const router: Router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/success", asyncHandler(success));

export default router;
