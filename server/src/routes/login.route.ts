import express, { Router } from "express";
import { submitLoginForm } from "../controllers/login.controller";

const loginRoute: Router = express.Router();

loginRoute.post("/", submitLoginForm);

export default loginRoute;

