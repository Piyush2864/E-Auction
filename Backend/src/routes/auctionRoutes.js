import express from "express";
import { allAuction, createAuction, deleteAuction, getAuctionById, updateAuctionStatus } from "../controllers/auctionController.js";
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/create-auction').post(protect, createAuction);

router.route('/all-auction').get(protect ,allAuction);

router.route('/getauction/:id').get(protect ,getAuctionById);

router.route('/status-update/:id').put(protect, updateAuctionStatus);

router.route('/delete-auction/:id').delete(protect, deleteAuction);

export default router;