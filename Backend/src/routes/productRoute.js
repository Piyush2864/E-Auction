import express from "express";
import { createProduct, getProductById } from "../controllers/productController.js";


const router = express.Router();

router.route('/create-product').post(createProduct);

router.route('/get-product/:id').get(getProductById);

export default router;