import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryContoller.js";
import { authorizeRoles, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-category').post(protect, authorizeRoles('admin', 'seller'), createCategory);

router.route('/all-category').get(protect, authorizeRoles('admin', 'seller'), getAllCategories);

router.route('/get-category/:id').get(protect, authorizeRoles('admin', 'seller'), getCategoryById);

router.route('/update-category/:id').put(protect, authorizeRoles('admin', 'seller'), updateCategory);

router.route('/delete/:id').delete(protect, authorizeRoles('admin', 'seller'), deleteCategory);


export default router;