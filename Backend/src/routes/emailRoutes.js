import express from 'express';
import { notifyBuyerAboutAuction } from '../controllers/emailController.js';


const router = express.Router();


router.route('/notify-biyers').post(notifyBuyerAboutAuction);

export default router;