import express from 'express';
import { getBuyerDashboard } from '../controllers/buyerDashboardController.js';



const router = express.Router();

router.route('/buyer-dashboard').get(getBuyerDashboard);

export default router;