import express from "express";
import { createProduct, getProductById } from "../controllers/productController.js";
import { authorizeRoles, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-product').post(protect, authorizeRoles('admin', 'seller'), createProduct);

router.route('/get-product/:productId').get(protect, authorizeRoles('admin', 'seller'), getProductById);

export default router;