import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryContoller";


const router = express.Router();

router.route('/create-category').post(createCategory);

router.route('/all-category').get(getAllCategories);

router.route('/get-category/:id').get(getCategoryById);

router.route('/update-category/:id').put(updateCategory);

router.route('/delete').delete(deleteCategory);

