import express from 'express';
import { getSellerDashboard } from '../controllers/sellerDashboardController';


const router = express.Router();

router.route('/seller-dashboard').get(getSellerDashboard);

export default router;