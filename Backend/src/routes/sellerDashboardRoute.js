import express from 'express';
import { getSellerDashboard } from '../controllers/sellerDashboardController.js';
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.route('/seller-dashboard').get(protect, getSellerDashboard);

export default router;