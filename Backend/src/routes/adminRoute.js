import express from 'express';
import { approveProductForAuction, approveSeller, deleteProduct, deleteUser, endAuction, getAllAuctions, getAllProducts, getAllSellers, getAllUsers, getBidsForProduct, rejectProductForAuction, rejectSeller } from '../controllers/adminController.js';


const router = express.Router();

router.route('/users').get(getAllUsers);

router.route('/delete-user/:userId').delete(deleteUser);

router.route('/sellers').get(getAllSellers);

router.route('/seller/:sellerId').post(approveSeller);

router.route('/seller/;sellerId').post(rejectSeller);

router.route('/products').get(getAllProducts);

router.route('/approve-product/:productId').post(approveProductForAuction);

router.route('/reject-product/:productId').post(rejectProductForAuction);

router.route('/delete-product/:productId').delete(deleteProduct);

router.route('/auctions').get(getAllAuctions);

router.route('/end-auction').post(endAuction);

router.route('/get-product-bids/:productId').get(getBidsForProduct);