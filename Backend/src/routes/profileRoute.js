import express from 'express';
import { authorizeRoles, protect } from '../middlewares/authMiddleware';
import { addNotification, createProfile, deleteProfile, getProfile, markNotificationAsRead, updateProfile } from '../controllers/profileController';




const router = express.Router();

router.route('/create-profile').post(protect, authorizeRoles('buyer'), createProfile);

router.route('/get-profile').get(protect, authorizeRoles('admin', 'buyer'), getProfile);

router.route('/update-profile').put(protect, authorizeRoles('admin', 'buyer'), updateProfile);

router.route('delete-profile/:userId').delete(protect, authorizeRoles('admin', 'buyer'), deleteProfile);

router.route('/add-notification/:userId').post(protect, authorizeRoles('admin'), addNotification);

router.route('/mark-read/:userId').post(protect, authorizeRoles('admin', 'buyer'), markNotificationAsRead);