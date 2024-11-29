import express from "express";
import { getBidsByAuction, getBidsByUser, placeBid } from "../controllers/bidController.js";
import {authorizeRoles, protect} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/place-bid').post(protect, authorizeRoles('admin', 'buyer'), placeBid);

router.route('/auction-bid/:auctionId').get(protect, authorizeRoles('admin', 'buyer'), getBidsByAuction);

router.route('/user-bid/:userId').get(protect, authorizeRoles('admin', 'buyer'), getBidsByUser);

export default router;