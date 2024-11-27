import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryContoller.js";
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-category').post(protect, createCategory);

router.route('/all-category').get(protect, getAllCategories);

router.route('/get-category/:id').get(protect, getCategoryById);

router.route('/update-category/:id').put(protect, updateCategory);

router.route('/delete/:id').delete(protect, deleteCategory);


export default router;