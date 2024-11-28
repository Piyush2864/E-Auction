import express from "express";
import { forgotPassword, loginUser, logOutUser, registerUser, resetPassword } from "../controllers/userController.js";
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(logOutUser);

router.route('/forgot-password').post(protect, forgotPassword);

router.route('/reset-password/:token').post(protect, resetPassword);

export default router;