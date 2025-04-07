import express, { Router } from "express";
import { submitRegistrationForm } from "../controllers/register.controller";

const registerRoute: Router = express.Router();

registerRoute.post("/", submitRegistrationForm);

export default registerRoute;

