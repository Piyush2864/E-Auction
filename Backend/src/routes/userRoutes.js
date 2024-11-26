import express from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/userController";

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(logOutUser);