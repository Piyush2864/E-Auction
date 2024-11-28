import express from 'express';
import { approveProductForAuction, approveSeller, deleteProduct, deleteUser, endAuction, getAllAuctions, getAllProducts, getAllSellers, getAllUsers, getBidsForProduct, rejectProductForAuction, rejectSeller } from '../controllers/adminController.js';
import { getAdminDashboardData } from '../controllers/adminDashboardController.js';
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.route('/users').get(protect, getAllUsers);

router.route('/delete-user/:userId').delete(protect, deleteUser);

router.route('/sellers').get(protect, getAllSellers);

router.route('/seller/:sellerId').post(protect, approveSeller);

router.route('/reject-seller/:sellerId').post(protect, rejectSeller);

router.route('/products').get(protect, getAllProducts);

router.route('/approve-product/:productId').post(protect, approveProductForAuction);

router.route('/reject-product/:productId').post(protect, rejectProductForAuction);

router.route('/delete-product/:productId').delete(protect, deleteProduct);

router.route('/auctions').get(protect, getAllAuctions);

router.route('/end-auction/:auctionId').post(protect, endAuction);

router.route('/get-product-bids/:productId').get(protect, getBidsForProduct);

router.route('/dashboard').get(protect, getAdminDashboardData);

export default router;