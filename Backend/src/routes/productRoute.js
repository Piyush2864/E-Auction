import express from "express";
import { createProduct, getProductById } from "../controllers/productController.js";
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-product').post(protect, createProduct);

router.route('/get-product/:productId').get(protect, getProductById);

export default router;