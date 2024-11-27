import express from "express";
import { getBidsByAuction, getBidsByUser, placeBid } from "../controllers/bidController.js";
import {protect} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/place-bid').post(protect, placeBid);

router.route('/auction-bid/:auctionId').get(protect, getBidsByAuction);

router.route('/user-bid/:userId').get(protect, getBidsByUser);

export default router;