import express from "express";
import { createSeller, deleteSeller, getAllSeller, getSellerById, getSellerProducts, updateSeller } from '../controllers/sellerController.js';
import { authorizeRoles, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-seller').post(protect, authorizeRoles('seller'), createSeller);

// router.route('/get-all-seller').get(protect, getAllSeller);

router.route('/get-seller/:sellerId').get(protect, authorizeRoles('seller'), getSellerById);

router.route('/update-seller/:sellerId').put(protect, authorizeRoles('seller'), updateSeller);

router.route('/delete-seller/:id').delete(protect, authorizeRoles('seller'), deleteSeller);

router.route('/products/:sellerId').get(protect, authorizeRoles('seller'), getSellerProducts);

// router.route('/verify/:sellerId').put(protect, verifySeller);

export default router;