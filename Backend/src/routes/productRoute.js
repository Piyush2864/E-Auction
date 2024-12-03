import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/productController.js";
import { authorizeRoles, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-product').post(protect, authorizeRoles('admin', 'seller'), createProduct);

router.route('/get-all-product').get(protect, authorizeRoles('admin', 'buyer', 'seller'), getAllProducts);

router.route('/get-product/:productId').get(protect, authorizeRoles('admin', 'seller'), getProductById);

export default router;