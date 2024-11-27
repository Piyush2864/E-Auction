import Auction from '../models/auctionModel.js';
import Bid from '../models/bidModel.js';


export const getBuyerDashboard = async(req, res) => {
    try {
        const buyerId = req.user._id;

        const dashboardData = await Promise.all([
            Auction.aggregate([
                {$match: { status: 'active'}},
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                {
                    $unwind: '$productDetails',
                },
            ]),

            Bid.aggregate([
                {$match: { bidder: buyerId}},
                {
                    $lookup: {
                        from: 'auctions',
                        localField: 'auction',
                        foreignField: '_id',
                        as: 'auctionDetails',
                    },
                },
                {
                    $unwind: '$auctionDetails',
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'auctionDetails.product',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                {
                    $unwind: '$productDetails',
                },
            ]),

            Auction.aggregate([
                {$match: { participants: buyerId, status: 'completed'}},
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                {
                    $unwind: '$productDetails',
                },
            ]),

            Auction.aggregate([
                {$match: {status: 'upcoming'}},
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                {
                    $unwind: '$productDetails',
                },
            ]),
        ]);

        const [availableAuctions, currentBid, pastParticipation, notification] = dashboardData;

        return res.status(200).json({
            success: true,
            data: {
                availableAuctions,
                currentBid,
                pastParticipation,
                notification
            },
        });
    } catch (error) {
        console.error('Error fetching buyer dashboard data:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while buyer dashboard data.'
        });
    }
};