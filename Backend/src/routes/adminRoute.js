import express from 'express';
import { approveProductForAuction, approveSeller, deleteProduct, deleteUser, endAuction, getAllAuctions, getAllProducts, getAllSellers, getAllUsers, getBidsForProduct, rejectProductForAuction, rejectSeller } from '../controllers/adminController.js';
import { getAdminDashboardData } from '../controllers/adminDashboardController.js';
import { authorizeRoles, protect } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.route('/users').get(protect, authorizeRoles('admin'), getAllUsers);

router.route('/delete-user/:userId').delete(protect, authorizeRoles('admin'), deleteUser);

router.route('/sellers').get(protect, authorizeRoles('admin'), getAllSellers);

router.route('/seller/:sellerId').post(protect, authorizeRoles('admin'), approveSeller);

router.route('/reject-seller/:sellerId').post(protect, authorizeRoles('admin'), rejectSeller);

router.route('/products').get(protect, authorizeRoles('admin'), getAllProducts);

router.route('/approve-product/:productId').post(protect, authorizeRoles('admin'), approveProductForAuction);

router.route('/reject-product/:productId').post(protect, authorizeRoles('admin'), rejectProductForAuction);

router.route('/delete-product/:productId').delete(protect, authorizeRoles('admin'), deleteProduct);

router.route('/auctions').get(protect, authorizeRoles('admin'), getAllAuctions);

router.route('/end-auction/:auctionId').post(protect, authorizeRoles('admin'), endAuction);

router.route('/get-product-bids/:productId').get(protect, authorizeRoles('admin'), getBidsForProduct);

router.route('/dashboard').get(protect, authorizeRoles('admin'), getAdminDashboardData);

export default router;