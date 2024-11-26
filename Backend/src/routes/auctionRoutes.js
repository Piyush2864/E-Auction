import express from "express";
import { allAuction, createAuction, deleteAuction, getAuctionById, updateAuctionStatus } from "../controllers/auctionController";


const router = express.Router();

router.route('/create-auction').post(createAuction);

router.route('/all-auction').get(allAuction);

router.route('/getauction/:id').get(getAuctionById);

router.route('/status-update/:id').put(updateAuctionStatus);

router.route('/delete-auction/:id').delete(deleteAuction);