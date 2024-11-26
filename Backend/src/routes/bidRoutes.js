import express from "express";
import { getBidsByAuction, getBidsByUser, placeBid } from "../controllers/bidController";


const router = express.Router();

router.route('/place-bid').post(placeBid);

router.route('/auction-bid/:auctionId').get(getBidsByAuction);

router.route('/user-bid/:userId').get(getBidsByUser);