// import Seller from '../models/sellerModel.js';
import User from '../models/userModel.js'
import Product from '../models/productModel.js';
import Auction from '../models/auctionModel.js';
import mongoose from 'mongoose'

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully.',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:',error );
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const deleteUser = async(req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
            data: user
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAllSellers = async(req, res) => {
    try {
        const sellers = await Seller.find().populate('listedProducts');

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully.',
            data: sellers
        });
    } catch (error) {
        console.error('Error fetching sellers:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching sellers.'
        });        
    }
};


export const approveSeller = async(req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message:'User not found.'
            });
        }

        user.isSeller = true;
        user.sellerRequest = false;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Seller request approved successfully.',
            data: seller
        });
    } catch (error) {
        console.error('Error verifing seller:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const rejectSeller = async(req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        user.sellerRequest = false;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Seller request rejected successfully.',
            data: seller
        });
    } catch (error) {
        console.error('Error rejecting seller: ', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find().populate('seller category');

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully.',
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const approveProductForAuction = async(req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(productId, { isInAuction: true }, { new: true });

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product approved successfully.',
            data: product
        });
    } catch (error) {
        console.error('Error approving product for auction:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while approving product.'
        });
    }
};


export const rejectProductForAuction = async(req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(productId, { isInAuction: true }, { new: true });

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product rejected for auction.'
        });
    } catch (error) {
        console.error('Error rejecting product for auction:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while rejecting product.'
        });
    }
};


export const deleteProduct = async(req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndDelete(productId);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
            data: product
        })
    } catch (error) {
        console.error('Error deleting products;', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAllAuctions = async(req, res) => {
    try {
        const auctions = await Auction.find().populate('product seller');

        return res.status(200).json({
            success: true,
            message: 'Auction fetched succesfully.',
            data: auctions
        });
    } catch (error) {
        console.error('Error fetching auctions:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const endAuction = async(req, res) => {
    const { auctionId } = req.params;
    try {
        const auction = await Auction.findByIdAndUpdate(auctionId, { status: 'end'}, { new: true });

        if(!auction) {
            return res.status(404).json({
                success: false,
                message: 'Auction not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Auction ended successfully.',
            data: auction
        })
    } catch (error) {
        console.error('Error ending auction:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getBidsForProduct = async(req, res) => {
    const { productId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid product ID.',
            });
          }

        const product = await Product.findById(productId).populate('bids');

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Bids fetched successfully.',
            data: product
        });
    } catch (error) {
        console.error('Error fetching bids:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};