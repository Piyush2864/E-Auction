import express from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(logOutUser);

export default router;