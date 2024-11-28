import express from 'express';
import { getBuyerDashboard } from '../controllers/buyerDashboardController.js';
import { protect } from '../middlewares/authMiddleware.js'



const router = express.Router();

router.route('/buyer-dashboard').get(protect, getBuyerDashboard);

export default router;