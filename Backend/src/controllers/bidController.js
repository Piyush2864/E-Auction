import Bid from '../models/bidModel.js';
import Auction from '../models/auctionModel.js';
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';


export const placeBid = async (req, res) => {
    const { auctionId, userId, amount } = req.body;

    try {
        
        const auction = await Auction.findById(auctionId).populate('product');
        if (!auction) {
            return res.status(404).json({
                success: false,
                message: 'Auction not found.',
            });
        }


        if (auction.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Auction is not active.',
            });
        }

        
        if (new Date() > auction.bidEndDate) {
            return res.status(400).json({
                success: false,
                message: 'Auction has ended. Bidding is closed.',
            });
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        
        const product = auction.product;
        if (!product || !product.isInAuction) {
            return res.status(400).json({
                success: false,
                message: 'Product is not in an active auction.',
            });
        }

        
        if (amount <= auction.currentBid) {
            return res.status(400).json({
                success: false,
                message: 'Bid amount must be higher than the current bid.',
            });
        }


        const bid = new Bid({
            auction: auctionId,
            user: userId,
            amount,
        });
        await bid.save();

        
        auction.currentBid = amount;
        auction.bids.push(bid._id);
        await auction.save();

    
        const seller = await Seller.findById(auction.seller);
        if (seller) {
            seller.notifications.push({
                message: `A new bid of ${amount} has been placed on your product "${product.name}".`,
                read: false,
            });
            await seller.save();
        }

        return res.status(201).json({
            success: true,
            message: 'Bid placed successfully.',
            bid,
            auction,
        });
    } catch (error) {
        console.error('Error placing bid:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
};


export const getBidsByAuction = async(req, res) => {
    const { auctionId } = req.params;

    try {
        const getBids = await Bid.find({ auction: auctionId}).populate('user', 'name email');

        if(!getBids || getBids.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bids found for this auction.'
            });
        }

        return res.status(200).json({
            success: true,
            data: getBids
        })
    } catch (error) {
        console.error('Error fetching bids.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export const getBidsByUser = async(req, res) => {
    const { userId } = req.params;

    try {
        const bidsByUser = await Bid.find({ user: userId}).populate('auction', 'product currentBid');

        if(!bidsByUser || bidsByUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bids found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            data: bidsByUser
        });
    } catch (error) {
        console.error('Error fetching bids.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};