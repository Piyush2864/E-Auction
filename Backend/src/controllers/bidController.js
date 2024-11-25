import Bid from '../models/bidModel.js';
import Auction from '../models/auctionModel.js';


export const placeBid = async (req, res) => {
    const { auctionId, userId, amount } = req.body;

    try {
        const playsAuctionBid = await Auction.findById(auctionId);

        if (!playsAuctionBid) {
            return res.status(404).json({
                success: false,
                message: 'Auction not found.'
            });
        }

        if (playsAuctionBid.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Auction is not active.'
            });
        }

        if (amount <= playsAuctionBid.currentBid) {
            return res.status(400).json({
                success: false,
                message: 'Bid amount must be highre than the current bid.'
            });
        }

        const bid = new Bid({
            auction: auctionId,
            user: userId,
            amount
        });

        await bid.save();

        playsAuctionBid.currentBid = amount;
        playsAuctionBid.bids.push(bid._id);
        await playsAuctionBid.save();

        return res.status(201).json({
            success: true,
            message: 'Bid place successfully.',
            bid
        })
    } catch (error) {
        console.error('Error placing bid', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
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
        const bidsByUser = await Bid.find({ user: userId}).populate('aucton', 'product currentBid');

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