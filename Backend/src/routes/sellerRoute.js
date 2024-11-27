import express from "express";
import { createSeller, deleteSeller, getAllSeller, getSellerById, getSellerProducts, updateSeller, verifySeller } from '../controllers/sellerController.js';
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-seller').post(protect, createSeller);

router.route('/get-all-seller').get(protect, getAllSeller);

router.route('/get-seller/:sellerId').get(protect, getSellerById);

router.route('/update-seller/:sellerId').put(protect, updateSeller);

router.route('/delete-seller/:id').delete(protect, deleteSeller);

router.route('/products/:id').get(protect, getSellerProducts);

router.route('/verify/:sellerId').put(protect, verifySeller);

export default router;