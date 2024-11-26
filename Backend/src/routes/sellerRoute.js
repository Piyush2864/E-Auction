import express from "express";
import { createSeller, deleteSeller, getAllSeller, getSellerById, getSellerProducts, updateSeller, verifySeller } from '../controllers/sellerController.js';


const router = express.Router();

router.route('/create-seller').post(createSeller);

router.route('/get-all-seller').get(getAllSeller);

router.route('/get-seller/:id').get(getSellerById);

router.route('/update-seler/:id').put(updateSeller);

router.route('/delete-seller/:id').delete(deleteSeller);

router.route('/products/:id').get(getSellerProducts);

router.route('/verify/:id').put(verifySeller);