import express from "express";
import { allAuction, createAuction, deleteAuction, getAuctionById, notifyAuctionStart, updateAuctionStatus } from "../controllers/auctionController.js";
import { authorizeRoles, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-auction').post(protect, authorizeRoles('admin', 'buyer'), createAuction);

router.route('/all-auction').get(protect, authorizeRoles('admin', 'buyer'), allAuction);

router.route('/getauction/:id').get(protect, authorizeRoles('admin', 'buyer'), getAuctionById);

router.route('/status-update/:id').put(protect, authorizeRoles('admin'), updateAuctionStatus);

router.route('/delete-auction/:id').delete(protect, authorizeRoles('admin'), deleteAuction);

router.route('/notify').get(protect, authorizeRoles('admin'), notifyAuctionStart);

export default router;